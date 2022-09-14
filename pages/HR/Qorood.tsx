import React from "react";
import SideBar from "../../components/sideBar";
import { useRouter } from "next/router";
import TSB from "../../components/TSB";

// @ts-ignore
function Qorood(props) {
  const router = useRouter();
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex flex-col items-center justify-center w-3/4 p-5 mx-10 my-10 text-xl font-bold text-center bg-white shadow-xl mt-36 space-y-7 rounded-3xl">
        <h1 className="items-center self-center justify-center p-3 text-3xl font-bold text-center rounded-xl ">
          القروض
        </h1>
        <div className="grid grid-cols-4 grid-rows-3 gap-8">
          <div
            onClick={() => {
              router.push("/HR/CreateQard");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            صرف قروض
          </div>

          <div
            onClick={() => {
              router.push("/HR/CreateSadad");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            سداد قروض
          </div>

          <div
            onClick={() => {
              router.push("/HR/SadadatHistory");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            تاريخ السدادات
          </div>

          <div
            onClick={() => {
              router.push("/HR/QoroodHistory");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            قروض الشركة للموظفين
          </div>
        </div>
      </div>
      <TSB pageName="qorood" />
    </div>
  );
}

export default Qorood;
