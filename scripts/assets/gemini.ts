// Thin REST client for the Gemini API — images through the Interactions API (with the older
// generateContent shape as a fallback) and video through Veo's long-running predict endpoint.
// No SDK: the surface we need is four requests, and the REST shapes are what the docs publish.
//
// Docs: https://ai.google.dev/gemini-api/docs/image-generation · https://ai.google.dev/gemini-api/docs/veo
// Key:  https://aistudio.google.com/apikey → .env.local as GEMINI_API_KEY (GOOGLE_API_KEY also honoured).
// Veo has no free tier; image models do, with daily limits.

import { existsSync } from 'node:fs'
import { join } from 'node:path'

const BASE = 'https://generativelanguage.googleapis.com/v1beta'

export function loadEnv(root: string) {
  const file = join(root, '.env.local')
  if (existsSync(file)) {
    try { process.loadEnvFile(file) } catch { /* malformed line — fall through to process.env */ }
  }
}

export function apiKey(): string | null {
  return process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || null
}

function headers() {
  const key = apiKey()
  if (!key) throw new Error('No API key. Put GEMINI_API_KEY=… in .env.local (create one at https://aistudio.google.com/apikey).')
  return { 'x-goog-api-key': key, 'Content-Type': 'application/json' }
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE}/${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) })
  const text = await res.text()
  let json: any = null
  try { json = JSON.parse(text) } catch { /* non-JSON error body */ }
  if (!res.ok) {
    const msg = json?.error?.message || text.slice(0, 400)
    const err = new Error(`${res.status} ${path}: ${msg}`) as Error & { status: number }
    err.status = res.status
    throw err
  }
  return json
}

export type ImageResult = { data: Buffer; mime: string }

/** Walk any response shape and collect base64 image parts (inlineData / typed content / output_image). */
function collectImages(node: any, out: ImageResult[] = []): ImageResult[] {
  if (!node || typeof node !== 'object') return out
  if (Array.isArray(node)) { node.forEach((n) => collectImages(n, out)); return out }
  const mime = node.mimeType || node.mime_type
  if (typeof node.data === 'string' && node.data.length > 1000 && (!mime || String(mime).startsWith('image/'))) {
    out.push({ data: Buffer.from(node.data, 'base64'), mime: mime || 'image/png' })
    return out
  }
  for (const v of Object.values(node)) collectImages(v, out)
  return out
}

export type ImageRequest = { model: string; prompt: string; aspectRatio: string; imageSize?: string; referenceImages?: ImageResult[] }

/** One call → one image. Tries the Interactions API first, falls back to generateContent if the endpoint is unknown. */
export async function generateImage(req: ImageRequest): Promise<ImageResult> {
  const api = process.env.ASSET_IMAGE_API || 'interactions'
  if (api === 'interactions') {
    try {
      const input: any[] = [{ type: 'text', text: req.prompt }]
      for (const r of req.referenceImages ?? []) input.push({ type: 'image', mime_type: r.mime, data: r.data.toString('base64') })
      const json = await post('interactions', {
        model: req.model,
        input,
        response_format: { type: 'image', mime_type: 'image/png', aspect_ratio: req.aspectRatio, ...(req.imageSize ? { image_size: req.imageSize } : {}) },
      })
      const imgs = collectImages(json)
      if (imgs.length) return imgs[0]
      throw new Error(`Interactions API returned no image: ${JSON.stringify(json).slice(0, 300)}`)
    } catch (e: any) {
      // Fall back only when the endpoint itself is the problem — a bad key fails identically on both.
      if (!(e.status === 404 || (e.status === 400 && !/API key/i.test(e.message)))) throw e
      process.stderr.write(`  interactions endpoint refused (${e.status}); retrying via generateContent\n`)
    }
  }
  const parts: any[] = [{ text: req.prompt }]
  for (const r of req.referenceImages ?? []) parts.push({ inlineData: { mimeType: r.mime, data: r.data.toString('base64') } })
  const json = await post(`models/${req.model}:generateContent`, {
    contents: [{ parts }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: req.aspectRatio, ...(req.imageSize ? { imageSize: req.imageSize } : {}) } },
  })
  const imgs = collectImages(json)
  if (imgs.length) return imgs[0]
  const reason = json?.candidates?.[0]?.finishReason || json?.promptFeedback?.blockReason
  throw new Error(`No image in response${reason ? ` (${reason})` : ''}: ${JSON.stringify(json).slice(0, 300)}`)
}

export type VideoRequest = {
  model: string; prompt: string; aspectRatio: '16:9' | '9:16'; resolution: '720p' | '1080p' | '4k'; durationSeconds: 4 | 6 | 8
  firstFrame?: ImageResult; negativePrompt?: string; onPoll?: (seconds: number) => void
}

/** Veo: start a long-running operation, poll until done, download the MP4 bytes. */
export async function generateVideo(req: VideoRequest): Promise<Buffer> {
  const instance: any = { prompt: req.prompt }
  if (req.firstFrame) instance.image = { inlineData: { mimeType: req.firstFrame.mime, data: req.firstFrame.data.toString('base64') } }
  const op = await post(`models/${req.model}:predictLongRunning`, {
    instances: [instance],
    parameters: { aspectRatio: req.aspectRatio, resolution: req.resolution, durationSeconds: String(req.durationSeconds), personGeneration: 'allow_adult', ...(req.negativePrompt ? { negativePrompt: req.negativePrompt } : {}) },
  })
  const name: string = op.name
  if (!name) throw new Error(`Veo did not return an operation name: ${JSON.stringify(op).slice(0, 300)}`)
  const started = Date.now()
  const deadline = started + 15 * 60_000
  let status: any = op
  while (!status.done) {
    if (Date.now() > deadline) throw new Error(`Veo operation ${name} still running after 15 minutes`)
    await new Promise((r) => setTimeout(r, 10_000))
    req.onPoll?.(Math.round((Date.now() - started) / 1000))
    const res = await fetch(`${BASE}/${name}`, { headers: headers() })
    status = await res.json()
    if (status.error) throw new Error(`Veo operation failed: ${status.error.message || JSON.stringify(status.error)}`)
  }
  const sample = status.response?.generateVideoResponse?.generatedSamples?.[0] ?? status.response?.generatedVideos?.[0]
  const uri: string | undefined = sample?.video?.uri
  if (uri) {
    const res = await fetch(uri, { headers: { 'x-goog-api-key': apiKey()! }, redirect: 'follow' })
    if (!res.ok) throw new Error(`Video download failed: ${res.status}`)
    return Buffer.from(await res.arrayBuffer())
  }
  const inline = sample?.video?.inlineData?.data ?? sample?.video?.bytesBase64Encoded
  if (inline) return Buffer.from(inline, 'base64')
  const filtered = status.response?.raiMediaFilteredReasons
  throw new Error(filtered ? `Veo filtered the request: ${filtered.join('; ')}` : `No video in response: ${JSON.stringify(status.response).slice(0, 400)}`)
}
