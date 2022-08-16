import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import SideBar from "../../../components/sideBar";

// @ts-ignore
const Home = (props) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-row items-center justify-around m-12 font-display basis-5/6 mr-80">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/manateq");
          }}
        >
          المناطق
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/mohafazat");
          }}
        >
          المحافظات
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/agazat");
          }}
        >
          الاجازات
        </button>

        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/hwafezReasons");
          }}
        >
          اسباب الحوافز
        </button>

        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/khasmReasons");
          }}
        >
          اسباب الخصومات
        </button>
      </div>
      <div className="flex flex-row items-center justify-around m-12 font-display basis-5/6 mr-80">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/dyana");
          }}
        >
          الديانات
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/wazefa");
          }}
        >
          الوظائف
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/types");
          }}
        >
          الجنس
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/weeklyvacation");
          }}
        >
          الاجازات الاسبوعية
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/officialagaza");
          }}
        >
          الاجازات الرسمية
        </button>
      </div>
      <div className="flex flex-row items-center justify-around m-12 font-display basis-5/6 mr-80">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => {
            router.push("/constants/system");
          }}
        >
          الثوابت
        </button>
      </div>
      <SideBar pageName="const" />
    </div>
  );
};

export default Home;
