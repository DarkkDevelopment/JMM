import { useRouter } from "next/router";
import React from "react";
import SideBar from "../../../components/sideBar";

// @ts-ignore
const Home = (props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex flex-col items-center justify-center w-3/4 p-5 mx-10 my-10 text-xl font-bold text-center bg-white shadow-xl mt-36 space-y-7 rounded-3xl">
        <h1 className="items-center self-center justify-center p-3 text-3xl font-bold text-center rounded-xl ">
          ثوابت النظام
        </h1>
        <div className="grid grid-cols-4 grid-rows-3 gap-8">
          <div
            onClick={() => {
              router.push("/HR/constants/mohafazat");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            المحافظات
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/manateq");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            المناطق
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/agazat");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            أسباب الاجازات
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/hwafezReasons");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            أسباب الحوافز
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/khasmReasons");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            أسباب الخصومات
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/dyana");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            الديانات
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/wazefa");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            الوظائف
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/types");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            الجنس
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/weeklyvacation");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            الاجازات الاسبوعية
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/officialagaza");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            الاجازات الرسمية
          </div>

          <div
            onClick={() => {
              router.push("/HR/constants/system");
            }}
            className="items-center self-center justify-center w-48 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
          >
            الثوابت العامة
          </div>
        </div>
      </div>
      <SideBar pageName="const" />
    </div>
  );
};

export default Home;
