import { NextPage } from "next";
import { useRouter } from "next/router";

import TSB from "../../components/TSB";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButtons from "../../components/Toogle";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { numberOfItemsPerPage } from "../../utils/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

import ReactLoading from "react-loading";

const Quality: NextPage = () => {
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
          <div className="mb-6">
            <button className="px-4 py-2 font-bold text-green-500 bg-transparent border border-green-500 rounded-xl w-[10vw] hover:bg-green-500 hover:text-white">
              تعديل
            </button>
          </div>
          <div className="flex flex-col pt-10 pl-10 pr-10 mr-10  bg-white shadow-xl space-y-7">
            <h3 className="text-3xl text-center text-black font-display pl-8">
              اسم المخزن
            </h3>
            <table className="text-center  border-collapse table-auto font-display ">
              <thead className="  text-center w-20 text-white bg-blue-900 border-b-2 ">
                <th> </th>
                <th className="py-4">الكميه المعلقه </th>

                <th>الكميه الفاسده</th>
                <th>الكميه الصالحه</th>
                <th>اجمالي الكميه</th>
                <th> التاريخ</th>
                <th>اسم المنتج</th>
              </thead>

              <tbody className="p-20  ">
                <td className="text-center  w-20 border-b-2 ">
                  <button className="px-4 py-2 font-bold text-blue-900 bg-transparent border border-blue-500 rounded-xl w-[10vw] hover:bg-blue-900 hover:text-white">
                    حفظ
                  </button>
                </td>

                <td className="w-20 text-center border-b-2 pt-6 pb-6">
                  <input
                    className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                    type="text"
                  />
                </td>
                <td className="w-20  text-center border-b-2">
                  <input
                    className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                    type="text"
                  />
                </td>
                <td className="w-20  text-center border-b-2">
                  <input
                    className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                    type="text"
                  />
                </td>
                <td className="w-20  text-center border-b-2">١٠ كيلو</td>
                <td className="w-20  text-center border-b-2">١٠ /٢/٢٠٢٢</td>

                <td className="w-20  text-center border-b-2">حديد</td>
              </tbody>
              <tbody className="p-20  ">
                <td className="text-center  w-20  mt-2 border-b-2 ">
                  <button className="px-4 py-2 font-bold text-blue-900 bg-transparent border border-blue-500 rounded-xl w-[10vw] hover:bg-blue-900 hover:text-white">
                    حفظ
                  </button>
                </td>

                <td className="w-20 text-center border-b-2 p-6">
                  {" "}
                  <input
                    className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                    type="text"
                  />{" "}
                </td>
                <td className="w-20  text-center border-b-2">
                  {" "}
                  <input
                    className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                    type="text"
                  />
                </td>
                <td className="w-20  text-center border-b-2">
                  {" "}
                  <input
                    className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                    type="text"
                  />
                </td>
                <td className="w-20  text-center border-b-2">١٠ كيلو</td>
                <td className="w-20  text-center border-b-2">١٠ /٢/٢٠٢٢</td>

                <td className="w-20  text-center border-b-2">حديد</td>
              </tbody>
            </table>
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
      <TSB pageName="Quality" />
    </div>
  );
};

export default Quality;
