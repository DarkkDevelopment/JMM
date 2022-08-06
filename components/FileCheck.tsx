import Image from "next/image";
import React from "react";
import checkLogo from "../public/icons/check.svg";

function FileCheck(props: any) {
  const isUploaded = props.isUploaded;
  return (
    <div>
      {isUploaded ? (
        <div>
          <Image src={checkLogo} alt="check" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FileCheck;
