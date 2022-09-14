import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import TSB from "../../components/TSB";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButtons from "../../components/Toogle";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@iconify/react";

import ReactLoading from "react-loading";
const ShoweMore: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="bg-gray-100 font-display basis-5/6">
        <div className="flex flex-col flex-1 p-10 space-y-2 jusify-center ">
          <div className="flex flex-col pt-10 pl-10 pr-10 mr-10 bg-white shadow-xl space-y-7">
            <h3 className="text-3xl text-center text-black font-display pl-8">
              اسم المخزن
            </h3>
            <table className=" flex-auto text-center  border-collapse table-auto font-display ">
              <thead className="  text-center w-20 text-white bg-blue-900 border-b-2 ">
                <th> </th>
                <th className="p-4">الكميه المعلقه </th>

                <th>الكميه الفاسده </th>
                <th>الكميه الصالحه </th>
                <th>اجمالي الكميه </th>

                <th>اسم المنتج</th>
              </thead>

              <tbody className="">
                <td className="text-center border-b-2 ">
                  <button
                    onClick={() => {
                      router.push("/Inventory/ProductDetails");
                    }}
                    className="px-4 py-2 font-bold text-blue-900 bg-transparent border border-blue-500 rounded-xl w-[10vw] hover:bg-blue-900 hover:text-white"
                  >
                    عرض المزيد
                  </button>
                </td>
                <td className="w-20 text-center border-b-2">٤ كيلو</td>
                <td className="w-20 text-center border-b-2">٤ كيلو</td>
                <td className="w-20 text-center border-b-2">٦ كيلو</td>
                <td className="w-20  text-center border-b-2">١٠ كيلو</td>
                <td className="w-20  text-center border-b-2">حديد</td>
              </tbody>
              <tbody className="p-20  ">
                <td className="text-center  w-20  mt-2 border-b-2 ">
                  <button
                    onClick={() => {
                      router.push("/Inventory/ProductDetails");
                    }}
                    className="px-4 py-2 font-bold text-blue-900 bg-transparent border border-blue-500 rounded-xl w-[10vw] hover:bg-blue-900 hover:text-white"
                  >
                    عرض المزيد
                  </button>
                </td>

                <td className="w-20 text-center border-b-2 p-6">٤ كيلو </td>
                <td className="w-20  text-center border-b-2">٤ كيلو</td>
                <td className="w-20  text-center border-b-2">٦ كيلو</td>
                <td className="w-20  text-center border-b-2">١٠ كيلو</td>

                <td className="w-20  text-center border-b-2">حديد</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TSB pageName="ShoweMore" />
    </div>
  );
};

export default ShoweMore;
