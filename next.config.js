/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mengoptimalkan untuk PWA
  reactStrictMode: true,
  swcMinify: true,
  // Menghapus x-powered-by header untuk keamanan
  poweredByHeader: false,
  // Kompres gambar statis
  compress: true,
  // Untuk Vercel deployment, kita tidak memerlukan static export
  // output: 'export',
}

module.exports = nextConfig; 