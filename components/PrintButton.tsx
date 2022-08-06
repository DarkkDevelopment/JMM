/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import printerLogo from "../public/icons/printer.png";

function PrintButton() {
  return (
    <button
      className="relative flex jutify-center items-center bg-blue-900 border   text-white rounded
        shadow group w-[10vw] p-2 mb-10 hover:bg-blue-500"
    >
      <span className="p-2 text-white border-l hover:text-white">
        <svg
          className="w-5 h-5 "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </span>

      <div className="absolute hidden min-w-full mt-1 bg-white rounded shadow-md top-full group-focus:block w-max">
        <ul className="text-left text-black border rounded">
          <li className="px-4 py-1 border-b hover:bg-gray-100">menu list 1</li>
          <li className="px-4 py-1 border-b hover:bg-gray-100">menu list 2</li>
        </ul>
      </div>
      <p className="px-4 py-1 text-right text-white">طباعة</p>
      <Image
        src={printerLogo}
        alt="printer"
        className="w-4 h-4 mt-5 text-white mr-7"
      />
    </button>
  );
}

export default PrintButton;
