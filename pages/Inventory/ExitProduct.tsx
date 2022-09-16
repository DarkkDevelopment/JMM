import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import TSB from "../../components/TSB";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButtons from "../../components/Toogle";
import ToggleButton from "@mui/material/ToggleButton";
import { Icon } from "@iconify/react";

import ReactLoading from "react-loading";
import { DropDownDateComp } from "../../components/DropDownDateComp";
import DropDownComp from "../../components/DropDownComp";

const ExitProduct: NextPage = () => {
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="bg-gray-100 font-display basis-5/6">
        <div className="flex flex-col flex-1 p-10 space-y-2 jusify-center ">
          <div className="mb-6">
            <h3 className="text-3xl text-center text-black font-display">
              اذن الخروج
            </h3>
          </div>
          <div className="flex flex-col p-10  mr-10  bg-white shadow-xl space-y-7 rounded-xl">
            <div className="grid gap-9 grid-cols-2 grid-rows-5 align-middle items-center justify-center">
              <div className=" flex items-center justify-center">
                <DropDownComp
                  options={[
                    {
                      id: 1,
                      name: "kieo",
                    },
                  ]}
                />
              </div>
              <div className=" items-center justify-center">
                <h3 className="flex text-xl   items-center justify-center">
                  اسم المخزن
                </h3>
              </div>
              <div className=" flex items-center justify-center">
                <DropDownComp
                  options={[
                    {
                      id: 1,
                      name: "kieo",
                    },
                  ]}
                />
              </div>
              <div className=" items-center justify-center">
                <h3 className="flex text-xl   items-center justify-center">
                  اسم المنتج
                </h3>
              </div>
              <div className=" flex items-center justify-center">
                <DropDownComp
                  options={[
                    {
                      id: 1,
                      name: "kieo",
                    },
                  ]}
                />
              </div>
              <div className=" items-center justify-center">
                <h3 className="flex text-xl   items-center justify-center">
                  خارج الي
                </h3>
              </div>
              <div className=" flex items-center justify-center">
                <DropDownComp
                  options={[
                    {
                      id: 1,
                      name: "kieo",
                    },
                  ]}
                />
              </div>
              <div className=" items-center justify-center">
                <h3 className="flex text-xl   items-center justify-center">
                  اسم الموظف
                </h3>
              </div>
              <div className=" flex items-center space-x-8 ml-36">
                <h6>كيلو</h6>
                <input
                  className="w-20 py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
                  type="text"
                />
              </div>
              <div className=" items-center justify-center">
                <h3 className="flex text-xl   items-center justify-center">
                  الكميه
                </h3>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pt-5">
            <button className="items-center self-center justify-center w-40 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500">
              حفظ
            </button>
          </div>
        </div>
      </div>
      <TSB pageName="ExitProduct" />
    </div>
  );
};

export default ExitProduct;
