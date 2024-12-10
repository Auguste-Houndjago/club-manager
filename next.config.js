/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode de sortie recommandé pour Vercel
  output: 'standalone', 

  // Configuration des images
  images: { 
    unoptimized: false, 
  },

  // Configuration pour Vercel
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
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