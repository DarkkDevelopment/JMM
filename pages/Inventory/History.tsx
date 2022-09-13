import { NextPage } from "next";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import React from "react";

const History: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="bg-gray-100 font-display basis-5/6">
        <div className="flex flex-col flex-1 p-10 space-y-2 jusify-center ">
          <div className="flex flex-col pt-10 pl-10 pr-10 mr-10 bg-white shadow-xl space-y-7">
          <h3 className="text-3xl text-center text-black font-display">
            دخول
            </h3>
            <table className="text-right border-collapse table-auto font-display">
              <thead className="text-right text-white bg-blue-900 ">
                <th className="w-20 p-4 text-right border-b-2">التاريخ</th>
                <th className="w-20 p-4 text-right border-b-2">الكميه</th>
                <th className="w-20 p-4 text-right border-b-2">اسم المورد</th>
                <th className="w-20 p-4 text-right border-b-2">الاسم</th>
              </thead>

              <tbody className="p-10 ">
                <td className="w-20 p-4 text-right border-b-2">٢٢/٣/٢٠٢٠</td>
                <td className="w-20 p-4 text-right border-b-2">١٠ كيلو</td>
                <td className="w-20 p-4 pr-9  text-right border-b-2">مينا</td>
                <td className="w-20 p-4 text-right border-b-2">حديد</td>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col pt-10 pl-10 pr-10 mr-10 bg-white shadow-xl space-y-7">
          <h3 className="text-3xl text-center text-black font-display">
            خروج
            </h3>
            <table className="text-right border-collapse table-auto font-display">
              <thead className="text-right text-white bg-blue-900 ">
              <th className="w-20 p-4 text-right border-b-2">التاريخ</th>
                <th className="w-20 p-4 text-right border-b-2">الكميه</th>
                <th className="w-20 p-4 text-right border-b-2">اسم المورد</th>
                <th className="w-20 p-4 text-right border-b-2">الاسم</th>
              </thead>

              <tbody className="p-10 ">
              <td className="w-20 p-4 text-right border-b-2">٢٢/٣/٢٠٢٠</td>
                <td className="w-20 p-4 text-right border-b-2">١٠ كيلو</td>
                <td className="w-20 p-4 pr-9 text-right  border-b-2">مينا</td>
                <td className="w-20 p-4 text-right border-b-2">حديد</td>
              </tbody>
            </table>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default History;