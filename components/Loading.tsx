import React from "react";
import ReactLoading from "react-loading";
import logo from "../public/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import "animate.css";
import { Pagination, Stack } from "@mui/material";
function Loading() {
  const router = useRouter();
  return (
    <div
      className="flex items-center flex-col justify-center mt-52"
      onClick={() => router.push("/")}
    >
      <div className="animate__animated animate__headShakeeat">
        <Image src={logo} alt="logo" width={300} height={300} />
      </div>

      <div className="items-center justify-center">
        {" "}
        <ReactLoading
          type={"spinningBubbles"}
          color={"blue"}
          height={100}
          width={100}
        />
      </div>
    </div>
  );
}

export default Loading;
