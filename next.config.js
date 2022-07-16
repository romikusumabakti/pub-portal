/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["id", "en", "ar", "su", "jv", "min", "ms", "btk"],
    defaultLocale: "id",
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextTranslate(nextConfig);
