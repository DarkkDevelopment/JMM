/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import logo from "../public/images/logo.png";
import employeeLogo from "../public/icons/employee.png";
import vacationLogo from "../public/icons/sunbed.png";
import insuranceLogo from "../public/icons/insurance.png";
import loanLogo from "../public/icons/loan.png";
import moneyLogo from "../public/icons/money.png";
import taxesLogo from "../public/icons/tax.png";
import reportLogo from "../public/icons/report.png";
import attendanceLogo from "../public/icons/user.png";
import absentLogo from '../public/icons/absent.png';
import { useRouter } from "next/router";

const SideBar = (props: any) => {
  // todo : need to use this later to control which item to be red
  const pageName = props.pageName;
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 right-0 z-40 h-full overflow-y-scroll text-black duration-300 ease-in-out bg-white border-2 border-solid p-15 font-display basis-1/6">
        <div className="flex flex-col p-10 space-y-7 ">
          <Image src={logo} alt="logo" width={200} height={200} />
          <hr className="border-b-2 border-gray-400 border-solid" />
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "employees"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Employees");
              }}
            >
              الموظفين
            </h3>
            <Image src={employeeLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
              ${pageName === "vacations"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Vacations");
              }}
            >
              الاجازات
            </h3>
            <Image src={vacationLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "money"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Money");
              }}
            >
              المرتبات
            </h3>
            <Image src={moneyLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "insurance"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Insurance");
              }}
            >
              التأمينات
            </h3>
            <Image src={insuranceLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "attendance"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Attendance");
              }}
            >
              حضور
            </h3>
            <Image src={attendanceLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "absence"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Absence");
              }}
            >
              غياب
            </h3>
            <Image src={absentLogo} alt="absence logo" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "loan"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Loan");
              }}
            >
              السلفة
            </h3>
            <Image src={loanLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "taxes"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Taxes");
              }}
            >
              الضرائب
            </h3>
            <Image src={taxesLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "incentive"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Incentive");
              }}
            >
              الحوافز
            </h3>
            <Image src={taxesLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "discounts"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Discounts");
              }}
            >
              الخصومات
            </h3>
            <Image src={taxesLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "reports"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/Reports");
              }}
            >
              التقارير
            </h3>
            <Image src={reportLogo} alt="employee" width={50} height={50} />
          </div>
          <div className="flex flex-row items-center space-x-4 justify-between">
            <h3
              className={`"text-2xl font-bold text-center  cursor-pointer hover:text-red-600 
            ${pageName === "const"
                  ? "text-red-600 text-2xl"
                  : "text-blue-900 text-2xl"
                }`}
              onClick={() => {
                router.push("/constants");
              }}
            >
              الثوابت
            </h3>
            <Image src={reportLogo} alt="employee" width={50} height={50} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
