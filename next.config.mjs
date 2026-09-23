/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Canonical host is www. Vercel already redirects the apex domain (308); this 301 is the app-level backstop
  // for any host or proxy that reaches the app on the bare domain. Keep the host redirect at Vercel/DNS as well.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'arablab-scientific.com' }],
        destination: 'https://www.arablab-scientific.com/:path*',
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig
