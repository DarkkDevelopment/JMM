/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // env: {
  //   NEXT_PUBLIC_HOST: "https://jmm-systems.vercel.app",
  // },
  env: {
    NEXT_PUBLIC_HOST: "http://localhost:3000",
  },
};

module.exports = nextConfig;
