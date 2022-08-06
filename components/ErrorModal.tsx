import React, { useState } from "react";
import Image from "next/image";
import errorImg from "../public/images/error.png";
type Props = {
  showModal: boolean;
  ErrorMsg: string;
  setShowModal: (showModal: boolean) => void;
};
export const ErrorModal = (props: Props) => {
  const { showModal, ErrorMsg, setShowModal } = props;
  return showModal ? (
    <div className="absolute z-50 flex flex-col items-center self-center justify-center h-auto p-4 bg-white rounded-lg shadow-2xl left-1/3 top-1/2 w-fit">
      <Image src={errorImg} alt="" width={100} height={100} className="mb-6" />
      <h2 className="mx-4 mt-2 text-base font-semibold text-center text-gray-400">
        {ErrorMsg}
      </h2>
      <div className="flex gap-5">
        <button
          className="w-auto h-10 px-12 my-5 font-semibold text-red-600 border border-red-100 rounded-md  hover:bg-red-700 hover:text-white hover:shadow-lg"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  ) : null;
};
