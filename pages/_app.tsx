import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="font-display">
        <Head>
          <title>JMM</title>
          <meta
            name="description"
            content="this is an erp-system Website fully customizable"
          />
          <link rel="icon" href="/logo.png" />
        </Head>
      </div>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
