/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true, // 圧縮無効
          },
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true,
    // TODO: 本番環境のドメインを設定する
    domains: ["localhost", "localhost:54321", "images.unsplash.com", "uploads-ssl.webflow.com"],
  },
};

module.exports = nextConfig;
