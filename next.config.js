// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       // Add your own CDN/image host domains here once you swap in
//       // real product photography, e.g. { hostname: "cdn.chaarchulha.com" }.
//     ],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  basePath: isProd ? "/ChaarChulha" : "",
  assetPrefix: isProd ? "/ChaarChulha/" : "",
  trailingSlash: true,
};

module.exports = nextConfig;