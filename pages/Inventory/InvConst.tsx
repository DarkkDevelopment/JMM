import { useRouter } from "next/router";
import React from "react";

import TSB from "../../components/TSB";

// @ts-ignore
const InvConst = (props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex flex-col items-center justify-center w-3/4 p-5 mx-10 my-10 text-xl font-bold text-center bg-white shadow-xl mt-36 space-y-7 rounded-3xl">
        <h1 className="items-center self-center justify-center p-3 text-3xl font-bold text-center rounded-xl ">
          ثوابت المخازن
        </h1>
        <div className="grid grid-cols-4 grid-rows-3 gap-8">
          <div
            onClick={() => {
              router.push("/Inventory/AddInventory");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            اضافه مخزن
          </div>

          <div
            onClick={() => {
              router.push("/Inventory/AddMesuringUnits");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            وحدات القياس
          </div>
          <div
            onClick={() => {
              router.push("/Inventory/AddProduct");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            اضافه منتج
          </div>
          <div
            onClick={() => {
              router.push("/Inventory/AddProduct");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            اضافه مورد
          </div>
        </div>
      </div>
      <TSB pageName="InvConst" />
    </div>
  );
};

export default InvConst;
