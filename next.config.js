/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextTranslate(nextConfig);
