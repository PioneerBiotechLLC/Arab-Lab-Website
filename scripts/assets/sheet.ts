// Contact sheet: every asset with its candidates shown *as the slot will crop them*, so the choice is
// made on the real framing. Picking radios composes the `approve` command. Plain HTML, opens from disk.

import type { Asset } from './manifest.ts'

export type SheetRow = { asset: Asset; candidates: { version: number; rel: string; meta: any }[]; approved?: number; published: boolean }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function renderSheet(rows: SheetRow[]): string {
  const groups = [...new Set(rows.map((r) => r.asset.group))]
  const total = rows.reduce((n, r) => n + r.candidates.length, 0)
  const body = groups.map((g) => `
<section>
  <h2>${esc(g)}</h2>
  ${rows.filter((r) => r.asset.group === g).map(row).join('')}
</section>`).join('')

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Arab Lab · asset contact sheet</title>
<style>
  :root{--white:#fff;--paper:#F6F8FA;--ink:#0F2438;--muted:#4A5D72;--border:#DDE4EC;--orange:#AD5A06;--brand:#E68A1F;--danger:#B42318}
  *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:14px/1.5 -apple-system,Inter,system-ui,sans-serif;padding:32px 32px 120px}
  h1{font-size:22px;margin:0 0 4px}h2{font-size:13px;font-weight:600;color:var(--muted);margin:40px 0 12px;padding-top:24px;border-top:1px solid var(--border)}
  .sub{color:var(--muted);margin:0 0 8px}code,.mono{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:12px}
  .asset{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:18px 20px;margin-bottom:14px}
  .head{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline;margin-bottom:12px}.head h3{margin:0;font-size:15px}.head .mono{color:var(--muted)}
  .state{font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid var(--border);color:var(--muted)}.state.pub{border-color:var(--brand);color:var(--orange)}
  .note{color:var(--muted);font-size:13px;margin:0 0 12px;max-width:70ch}
  .cands{display:flex;flex-wrap:wrap;gap:12px}
  label.c{display:block;cursor:pointer;width:min(100%,360px)}label.c input{position:absolute;opacity:0}
  figure{margin:0;position:relative;background:#e9eef3;border-radius:8px;overflow:hidden;outline:2px solid transparent;outline-offset:2px;transition:outline-color .15s}
  figure img,figure video{display:block;width:100%;height:100%;object-fit:cover}
  body.uncropped figure img,body.uncropped figure video{object-fit:contain}
  label.c input:checked + figure{outline-color:var(--brand)}label.c input:focus-visible + figure{outline-color:var(--ink)}
  figcaption{font-size:12px;color:var(--muted);margin-top:6px;display:flex;justify-content:space-between}
  .guide{position:absolute;inset:0;pointer-events:none}.guide::before{content:"";position:absolute;inset:0 60% 0 0;border-right:1px dashed rgba(15,36,56,.5);background:rgba(246,248,250,.18)}
  .guide::after{content:"headline zone";position:absolute;left:8px;bottom:6px;font:11px ui-monospace,Menlo,monospace;color:rgba(15,36,56,.7)}
  .guide.third::before{inset:66.7% 0 0 0;border:0;border-top:1px dashed rgba(255,255,255,.6);background:rgba(0,0,0,.12)}.guide.third::after{content:"text zone";color:rgba(255,255,255,.8)}
  .empty{color:var(--muted);font-size:13px}.empty code{color:var(--ink)}
  .bar{position:fixed;left:0;right:0;bottom:0;background:var(--ink);color:#fff;padding:14px 32px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
  .bar code{color:#F5A623;flex:1;min-width:280px;white-space:pre-wrap;word-break:break-all}
  .bar button,.toggle{font:inherit;border:1px solid rgba(255,255,255,.3);background:transparent;color:#fff;border-radius:999px;padding:8px 16px;cursor:pointer}
  .toggle{position:fixed;top:24px;right:32px;border-color:var(--border);color:var(--ink);background:var(--white)}
</style></head><body>
<h1>Asset contact sheet</h1>
<p class="sub">${rows.length} assets · ${total} candidates. Each candidate is shown cropped to its slot; toggle to see the full frame. Pick one per asset, then run the command in the bar.</p>
<button class="toggle" onclick="document.body.classList.toggle('uncropped');this.textContent=document.body.classList.contains('uncropped')?'Show slot crop':'Show full frame'">Show full frame</button>
${body}
<div class="bar"><span>Approve:</span><code id="cmd">pnpm assets approve …</code><button onclick="navigator.clipboard.writeText(document.getElementById('cmd').textContent)">Copy</button></div>
<script>
  function update(){var picks=[].slice.call(document.querySelectorAll('input[type=radio]:checked')).map(function(i){return i.name+'=v'+i.value});document.getElementById('cmd').textContent=picks.length?'pnpm assets approve '+picks.join(' '):'pnpm assets approve … (pick candidates above)'}
  document.addEventListener('change',update);update();
</script>
</body></html>`

  function row(r: SheetRow) {
    const a = r.asset
    const ratio = `${a.width}/${a.height}`
    const isVideo = a.kind === 'video'
    const guide = a.id === 'hero' || a.id.endsWith('-hero') ? '<div class="guide"></div>' : a.id === 'sterility-feature' ? '<div class="guide third"></div>' : ''
    const cands = r.candidates.length
      ? `<div class="cands">${r.candidates.map((c) => `
      <label class="c"><input type="radio" name="${esc(a.id)}" value="${c.version}" ${r.approved === c.version ? 'checked' : ''}>
        <figure style="aspect-ratio:${ratio}">${isVideo ? `<video src="${esc(c.rel)}" muted loop playsinline controls preload="metadata"></video>` : `<img src="${esc(c.rel)}" alt="" loading="lazy">`}${guide}</figure>
        <figcaption><span>v${c.version}${r.approved === c.version ? ' · approved' : ''}</span><span class="mono">${c.meta.width ? `${c.meta.width}×${c.meta.height} · ` : ''}${esc(String(c.meta.model || ''))}</span></figcaption>
      </label>`).join('')}</div>`
      : `<p class="empty">No candidates yet — <code>pnpm assets gen ${esc(a.id)}</code>${r.published ? ' (a file is already in place from Flow)' : ''}</p>`
    return `
  <div class="asset" id="${esc(a.id)}">
    <div class="head"><h3>${esc(a.id)}</h3><span class="mono">${esc(a.out)}${isVideo ? '.mp4 / .webm' : ''}</span><span class="mono">${a.width}×${a.height} · ${a.ratio}${isVideo ? ' · 8 s' : ` · ≤ ${a.maxKB} KB`}</span><span class="state${r.published ? ' pub' : ''}">${r.published ? 'in public/' : r.approved ? `approved v${r.approved}` : r.candidates.length ? 'choose' : 'todo'}</span></div>
    ${a.note ? `<p class="note">${esc(a.note)}</p>` : ''}
    ${cands}
  </div>`
  }
}
