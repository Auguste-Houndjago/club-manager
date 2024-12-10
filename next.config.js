/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode de sortie recommandé pour Vercel
  output: undefined,

  // Configuration des images
  images: { 
    unoptimized: false, 
  },


  // Gestion des routes API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;