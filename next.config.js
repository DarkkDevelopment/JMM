/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HOST: "https://jmm-system.vercel.app",
  },
  // this is for testing not production as the master branch
  // env: {
  //   NEXT_PUBLIC_HOST: "https://jmm-testing-version.vercel.app",
  // },
  // env: {
  //   NEXT_PUBLIC_HOST: "http://localhost:3000",
  // },
};

module.exports = nextConfig;
