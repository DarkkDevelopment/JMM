import { ToggleButton } from "@mui/material";
import React from "react";
import TSB from "../../components/TSB";
import CheckIcon from "@mui/icons-material/Check";
import { Icon } from "@iconify/react";

const ProductDetails = () => {
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="bg-gray-100 font-display basis-5/6">
        <div className="flex flex-col flex-1 p-10 space-y-2 jusify-center ">
          <div className="flex flex-col pt-5 pl-10 pr-10 mt-5 mr-10 bg-white shadow-xl space-y-7 rounded-3xl">
            <h3 className="text-3xl ml-11 text-center text-black font-display mt-5">
              الحديد
            </h3>

            <table className=" flex-auto text-center  border-collapse table-auto font-display ">
              <thead className="  text-center w-20 text-white bg-blue-900 border-b-2 ">
                <th>الحاله</th>
                <th className="p-4">الكميه </th>

                <th> تاريخ الدخول </th>
                <th>اسم المورد</th>
              </thead>

              <tbody className="">
                <td className="w-20 text-center border-b-2  p-4">
                  <ToggleButton
                    disabled
                    value="check"
                    style={{
                      border: "1px solid grey",
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    <CheckIcon />
                  </ToggleButton>
                </td>
                <td className="w-20 text-center border-b-2">٢ كيلو</td>

                <td className="w-20  text-center border-b-2">٢٢/٢/٢٠٢٢</td>
                <td className="w-20  text-center border-b-2">مينا</td>
              </tbody>
              <tbody className="p-20 ">
                <td className="w-20 p-4 text-center border-b-2">
                  <ToggleButton
                    disabled
                    value="check"
                    style={{
                      border: "1px solid grey",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    <Icon icon="cil:x" width={25} height={25} />
                  </ToggleButton>
                </td>
                <td className="w-20  p-4  text-center border-b-2">٢ كيلو</td>

                <td className="w-20  text-center border-b-2">٢٢/٢/٢٠٢٢</td>
                <td className="w-20  text-center border-b-2">مينا</td>
              </tbody>
              <tbody className="p-20 ">
                <td className="w-20 p-4 text-center border-b-2">
                  <ToggleButton
                    disabled
                    value="check"
                    style={{
                      border: "1px solid grey",
                      backgroundColor: "gray",
                      color: "white",
                    }}
                  >
                    <Icon icon="bi:clock-history" width="24" height="24" />
                  </ToggleButton>
                </td>
                <td className="w-20  p-4  text-center border-b-2">٢ كيلو</td>

                <td className="w-20  text-center border-b-2">٢٢/٢/٢٠٢٢</td>
                <td className="w-20  text-center border-b-2">مينا</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TSB pageName="ProductDetails" />
    </div>
  );
};

export default ProductDetails;
