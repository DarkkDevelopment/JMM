import React from "react";

type Props = {
  month: number,
  agazat: Array<{}>;
};

function EmployeeVacation(props: Props) {
  const { month, agazat } = props
  return (
    <div
      className="bg-gray-200 shadow-lg
      rounded p-10
    "
    >
      <div className="flex flex-col ">
        <label className="p-2 text-md text-center text-gray-700 ">
          {month} شهر
        </label>
        <div className="border-b-2 border-gray-500 w-full"></div>
        <label className="p-2 text-md text-right text-gray-700 ">
          عدد الأيام : {agazat.length}
        </label>
      </div>
    </div>
  );
}

export default EmployeeVacation;
