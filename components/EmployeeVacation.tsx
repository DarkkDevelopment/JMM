import React from "react";

type Props = {
  month: number;
  agazat: Array<{}>;
};

function EmployeeVacation(props: Props) {
  const { month, agazat } = props;
  return (
    <div className="p-10 bg-gray-200 rounded shadow-lg ">
      <div className="flex flex-col ">
        <label className="p-2 text-center text-gray-700 text-md ">
          {month} شهر
        </label>
        <div className="w-full border-b-2 border-gray-500"></div>
        <label className="p-2 text-right text-gray-700 text-md ">
          عدد الأيام : {agazat.length}
        </label>
      </div>
    </div>
  );
}

export default EmployeeVacation;
