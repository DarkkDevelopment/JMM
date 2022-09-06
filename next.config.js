/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HOST: "https://jmm-system.vercel.app",
    //NEXT_PUBLIC_HOST: "https://jmmdeployapp.azurewebsites.net",
    //DATABASE_URL: "postgres://jmm:darkdev_2000@jmmdepolydb.postgres.database.azure.com/postgres",
  },
  // this is for testing not production as the master branch
  // env: {
  //   NEXT_PUBLIC_HOST: "https://jmm-system.vercel.app",
  // },
  // this is for testing not production as the master branch
  // env: {
  //   NEXT_PUBLIC_HOST: "https://jmm-testing-version.vercel.app",
  // env: {
  //   NEXT_PUBLIC_HOST: "http://localhost:3000",
  // },
};

module.exports = nextConfig;
