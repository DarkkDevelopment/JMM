import { ChevronLeftIcon } from "@heroicons/react/solid";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import SideBar from "../../../components/sideBar";

// @ts-ignore
const Home = (props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex flex-col  p-5 mx-10 my-10 mt-36 bg-white shadow-xl space-y-7 rounded-3xl w-3/4 text-center text-xl  font-bold items-center justify-center">
        <h1 className="text-center text-3xl self-center font-bold items-center justify-center rounded-xl p-3 ">
          ثوابت النظام
        </h1>
        <div className="grid grid-cols-4 grid-rows-3 gap-8">
          <div onClick={() => {
              router.push("/HR/constants/mohafazat");
            }} className="text-white cursor-pointer m-auto bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            المحافظات
          </div>
          
          <div onClick={() => {
              router.push("/HR/constants/manateq");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            المناطق 
          </div>

          <div onClick={() => {
              router.push("/HR/constants/agazat");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            أسباب الاجازات 
          </div>

          <div onClick={() => {
              router.push("/HR/constants/hwafezReasons");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            أسباب الحوافز
          </div>

          <div onClick={() => {
              router.push("/HR/constants/khasmReasons");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            أسباب الخصومات
          </div>

          <div onClick={() => {
              router.push("/HR/constants/dyana");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            الديانات
          </div>

          <div onClick={() => {
              router.push("/HR/constants/wazefa");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            الوظائف 
          </div>

          <div onClick={() => {
              router.push("/HR/constants/types");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            الجنس
          </div>

          <div onClick={() => {
              router.push("/HR/constants/weeklyvacation");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            الاجازات الاسبوعية
          </div>

          <div onClick={() => {
              router.push("/HR/constants/officialagaza");
            }}
            className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            الاجازات الرسمية
          </div>

          <div onClick={() => {
              router.push("/HR/constants/system");
            }} className="text-white m-auto cursor-pointer bg-blue-900 hover:bg-blue-500 shadow-xl rounded-lg text-center text-xl self-center font-bold items-center justify-center py-3 w-48 px-5"> 
            الثوابت العامة
          </div>

        </div>
      </div>
      <SideBar pageName="const" />
    </div>
  );
};

export default Home;
