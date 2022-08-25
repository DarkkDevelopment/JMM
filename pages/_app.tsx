import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../redux/store";

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
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}

export default MyApp;
