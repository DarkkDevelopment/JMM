import React from 'react';
import ReactLoading from 'react-loading';
import logo from "../public/images/logo.png";
import Image from "next/image";

function Loading() {
    return (  <div className="flex flex-col p">
        <div className="items-center justify-center">

        <Image src={logo} alt="logo" width={200} height={200} /> 
        </div>
  
        <div className="items-center justify-center"> < ReactLoading type={'spokes'} color={'blue'} height={100} width={50}  /></div>
        
        </div> 
    );
}

export default Loading;

