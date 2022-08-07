import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import Logo from "../public/images/logo.png";

const Home: NextPage = (props) => {
  return (
    <>
      <div className="font-display">
        <Head>
          <title>ERP_SYSTEM</title>
          <meta
            name="description"
            content="this is an erp-system Website fully customizable"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-evenly mt-52">
          <Image src={Logo} width={300} height={300} alt="logo" />
          <div className="border-l-4 border-blue-900 h-500 "></div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Home;
