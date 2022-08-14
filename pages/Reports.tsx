import React, { useState } from "react";
import Dropdown from "../components/DropDownComp";
import RadioButtonComp from "../components/RadioButtonComp";
import SideBar from "../components/sideBar";

function Reports() {
  const [filterDate, setFilterDate] = useState(new Date());

  const reportOptions = [
    { value: "الاجازات", label: "الاجازات" },
    { value: "الحضور", label: "الحضور" },
    { value: "الغياب", label: "الغياب" },
    { value: "الضرائب", label: "الضرائب" },
    { value: "التأمينات", label: "التأمينات" },
    { value: "المرتبات", label: "المرتبات" },
  ];
  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex justify-center m-10 font-display basis-5/6">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center mb-5 ">
          
          </div>
          <div>
            <div className="flex flex-row items-center justify-center">
              <RadioButtonComp label="تقرير" options={reportOptions} />
            </div>
          </div>
          <div className="flex flex-col p-10 mt-10 space-y-10 bg-white rounded shadow-lg">
            <h1 className="text-2xl text-right text-gray-800 font-display">
              طباعة كل الموظفين
            </h1>
            <div className="flex flex-row items-center justify-center">
              <Dropdown title="الدين" />
              <Dropdown title="النوع" />
              <Dropdown title="المنطقة" />
              <Dropdown title="الوظيفة" />
              <Dropdown title=" سنوات التأمين" />
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
      <SideBar pageName="reports" />
    </div>
  );
}

export default Reports;
