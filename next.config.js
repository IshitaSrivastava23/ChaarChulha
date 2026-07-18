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

/** 
 * @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: "/ChaarChulha",
  assetPrefix: "/ChaarChulha",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;