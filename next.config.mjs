/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "covers.openlibrary.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
