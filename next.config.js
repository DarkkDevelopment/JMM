/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HOST: "http://localhost:3000",
  },
  // env: {
  //   NEXT_PUBLIC_HOST: "http://localhost:3000",
  // },
};

module.exports = nextConfig;
