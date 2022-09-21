import { NextPage } from "next";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import TSB from "../../components/TSB";
import React, { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { numberOfItemsPerPage } from "../../utils/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const ViewInventory: NextPage = () => {
  const router = useRouter();
  const pageCount = Math.ceil(10 / numberOfItemsPerPage);
  const [pageNumber, setPageNumber] = useState(0);

  const handleChangePage = (link: any) => {
    setPageNumber(link - 1);
  };
  var links = [];
  for (var i = 1; i <= pageCount; i++) {
    links.push(i);
  }

  return (
    <div className="flex flex-row bg-gray-100">
      <div className="bg-gray-100 font-display basis-5/6">
        <div className="flex flex-col flex-1 p-10 space-y-2 jusify-center ">
          <div className="flex flex-col pt-10 pl-10 pr-10 mr-10 bg-white shadow-xl space-y-7">
            <table className="text-right border-collapse table-auto font-display">
              <thead className="text-right text-white bg-blue-900 ">
                <tr>
                  <th className="w-20 p-4 text-right border-b-2"></th>
                  <th className="w-20 p-4 text-right border-b-2"></th>
                  <th className="w-20 p-4 text-right border-b-2"></th>
                  <th className="w-20 p-4 text-right border-b-2"></th>

                  <th className="w-20 p-4 text-right border-b-2">الاسم</th>
                </tr>
              </thead>

              <tbody className="p-10 ">
                <td className="text-center border-b-2 ">
                  <button
                    onClick={() => {
                      router.push("/Inventory/ShowMore");
                    }}
                    className="px-4 py-2 font-bold text-blue-900 bg-transparent border border-blue-500 rounded-xl w-[10vw] hover:bg-blue-900 hover:text-white"
                  >
                    عرض المزيد
                  </button>
                </td>
                <td></td>
                <td className="text-center border-b-2 ">
                  <button
                    onClick={() => {
                      router.push("/Inventory/History");
                    }}
                    className="px-4 py-2 font-bold text-red-400 border border-red-400 bg-transparent rounded-xl w-[10vw]  hover:bg-red-500 shadow-md font-display hover:text-white"
                  >
                    تاريخ المخزن
                  </button>
                </td>
                <td></td>

                <td className="w-20 p-4 text-right border-b-2">مواد خام</td>
              </tbody>
            </table>
          </div>
          <div className="flex flex-row items-center justify-center p-6 space-x-5 ">
            <div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                <div>
                  <nav
                    className="relative z-0 inline-flex space-x-1 rounded-md shadow-sm"
                    aria-label="Pagination"
                  ></nav>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center mt-10 space-x-5 ">
            <div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                <div>
                  <nav
                    className="relative z-0 inline-flex space-x-1 rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 rounded-l-md "
                      onClick={() => {
                        if (pageNumber > 0) {
                          setPageNumber(pageNumber - 1);
                        }
                      }}
                    >
                      <ChevronLeftIcon
                        className="w-5 h-5 "
                        aria-hidden="true"
                      />
                    </a>

                    {links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className={
                          pageNumber + 1 === link
                            ? "relative inline-flex items-center px-2 py-2 text-sm font-medium rounded text-white bg-blue-900"
                            : "relative inline-flex items-center px-2 py-2 text-sm font-medium rounded text-black border border-gray-300 bg-white  hover:bg-gray-100"
                        }
                        onClick={() => handleChangePage(link)}
                      >
                        {link}
                      </a>
                    ))}
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 rounded-l-md"
                      onClick={() => {
                        if (pageNumber < links.length - 1) {
                          setPageNumber(pageNumber + 1);
                        }
                      }}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TSB pageName="ViewInventory" />
    </div>
  );
};

export default ViewInventory;
function setPageNumber(arg0: number) {
  throw new Error("Function not implemented.");
}
