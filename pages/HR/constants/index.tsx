import { ChevronLeftIcon } from "@heroicons/react/solid";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import SideBar from "../../../components/sideBar";

// @ts-ignore
const Home = (props) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col p-10 mx-10 bg-white shadow-xl space-y-7 rounded-3xl w-3/4">
        <h1 className="text-center text-xl self-center font-bold m-10 items-center justify-center">
          ثوابت النظام
        </h1>
        <table className="text-center border-collapse table-auto font-display">
          <thead className="text-center text-white bg-blue-900">
            <tr >
              <th className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">

                </span>
              </th>
              <th className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الإسم
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="p-10">

            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center"
                  onClick={() => {
                    router.push("/HR/constants/mohafazat");
                  }}
                >
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer" />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  المحافظات
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center"
                  onClick={() => {
                    router.push("/HR/constants/manateq");
                  }}>
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer" />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center"

                >
                  المناطق
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/agazat");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  اسباب الاجازات
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/hwafezReasons");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  اسباب الحوافز
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/khasmReasons");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  اسباب الخصومات
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/dyana");
                    }}
                  />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الديانات
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/wazefa");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الوظائف
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/types");
                    }}
                  />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الجنس
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/weeklyvacation");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الاجازات الاسبوعية
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/officialagaza");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الاجازات الرسمية
                </span>
              </td>
            </tr>
            <tr className="p-4 ">
              <td className="p-4">
                <span className="text-right text-xl self-end font-bold m-10 justify-end">
                  <ChevronLeftIcon className="w-14 h-14 fill-blue-900 cursor-pointer"
                    onClick={() => {
                      router.push("/HR/constants/system");
                    }} />
                </span>
              </td>
              <td className="p-4">
                <span className="text-center text-xl self-center font-bold m-10 items-center justify-center">
                  الثوابت العامة
                </span>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <SideBar pageName="const" />
    </div>
  );
};

export default Home;
