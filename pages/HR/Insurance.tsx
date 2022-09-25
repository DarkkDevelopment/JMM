import React, { useEffect, useState } from "react";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import MonthSeed from "../../utils/MonthsSeed";
import { IgetInsurance } from "../../interfaces/insurance";
import { NoDataComponent } from "../../components/NoDataComponent";
import { DropDownDateComp } from "../../components/DropDownDateComp";
import { numberOfItemsPerPage } from "../../utils/constants";
import axios from "../../utils/axios";
import { InferGetServerSidePropsType } from "next";
import TSB from "../../components/TSB";

function Insurance(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const data: IgetInsurance[] = props.data;
  const Ta2meenValue = props.TotalTa2meenValue;
  const [filteredEmployees, setFilteredEmployees] = useState(data);
  const [totalT2menValue, setTotalT2menValue] = useState(Ta2meenValue);

  const [searchterm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [month, setMonth] = useState<string>(
    MonthSeed.find((month) => month.id === new Date().getMonth() + 1)!.name
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const pagesVisted = pageNumber * numberOfItemsPerPage;
  const pageCount = Math.ceil(filteredEmployees.length / numberOfItemsPerPage);
  const handleChangePage = (link: any) => {
    setPageNumber(link - 1);
  };

  var links = [];
  for (var i = 1; i <= pageCount; i++) {
    links.push(i);
  }

  useEffect(() => {
    if (searchterm == "") {
      setFilteredEmployees(data);
      setTotalT2menValue(totalT2menValue);
    } else {
      let filteredEmployeesCopy = filteredEmployees.filter((obj) => {
        let name =
          obj.PersonName.PersonFirstName +
          " " +
          obj.PersonName.PersonSecondName +
          " " +
          obj.PersonName.PersonThirdName +
          " " +
          obj.PersonName.PersonFourthName;
        if (name.includes(searchterm)) return obj;
      });
      setFilteredEmployees(filteredEmployeesCopy);
    }
  }, [
    Ta2meenValue,
    data,
    filteredEmployees,
    month,
    searchterm,
    totalT2menValue,
    year,
  ]);

  useEffect(() => {
    const neededMonth = MonthSeed.find((myMonth) => myMonth.name === month)!.id;
    const getInsurance = async () => {
      const getNewInsuranceData = await axios({
        method: "post",
        url: "/api/HR_Endpoints/insurance/getAll",
        data: {
          month: neededMonth,
          year: Number(year),
        },
      });
      let TotalTa2meen = getNewInsuranceData.data.data.reduce(
        (acc: any, curr: { FinalValue: any }) => acc + curr.FinalValue,
        0
      );
      setFilteredEmployees(getNewInsuranceData.data.data);
      setTotalT2menValue(TotalTa2meen);
    };
    getInsurance();
  }, [month, year]);

  return (
    <div className="flex flex-row mr-16 bg-gray-100 ">
      <div className="font-display basis-5/6">
        <div className="flex flex-col px-10 pt-10">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row justify-center mb-4 space-x-10">
              <DropDownDateComp
                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
              />
              <SearchField setSearchTerm={setSearchTerm} />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-10 mx-10 bg-white shadow-xl space-y-7 rounded-3xl">
          {filteredEmployees.length > 0 ? (
            <table className="text-center border-collapse table-auto font-display">
              <thead className="text-center text-white bg-blue-900">
                <tr>
                  <th className="p-4 text-center border-b-2 ">
                    القيمة النهائية
                  </th>
                  <th className="p-4 text-center border-b-2 ">نسبة التأمين</th>
                  <th className="p-4 text-center border-b-2 ">قيمة التأمين</th>
                  <th className="p-4 text-center border-b-2 ">
                    عدد سنوات التأمين
                  </th>
                  <th className="p-4 text-center border-b-2 ">
                    الرقم التأميني
                  </th>
                  <th className="p-4 text-center border-b-2 ">الرقم القومي</th>
                  <th className="p-4 text-center border-b-2 ">اسم الموظف</th>
                </tr>
              </thead>
              <tbody className="p-10">
                {filteredEmployees
                  .slice(pagesVisted, pagesVisted + numberOfItemsPerPage)
                  .map((employee) => {
                    return (
                      <tr key={employee.PersonNationalId} className="p-10">
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.FinalValue}
                        </td>
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.InsuranceBySherkaPercentage * 100}%
                        </td>
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.PersonInsuranceValue}
                        </td>
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.PersonNumberOfInsuranceYears}
                        </td>
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.PersonInsuranceId}
                        </td>
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.PersonNationalId}
                        </td>
                        <td className="justify-center p-4 text-center border-b-2 ">
                          {employee.PersonName.PersonFirstName +
                            " " +
                            employee.PersonName.PersonSecondName +
                            " " +
                            employee.PersonName.PersonThirdName +
                            " " +
                            employee.PersonName.PersonFourthName}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <NoDataComponent />
          )}
        </div>
        <div className="flex flex-row items-baseline mx-12 my-8">
          <h1 className="mr-5 text-2xl">جنيه مصري</h1>

          <h1 className="p-4 mr-5 text-2xl text-red-600 bg-white shadow-2xl text-bold space-y-7 rounded-xl">
            {totalT2menValue}
          </h1>
          <h1 className="text-2xl">الاجمالي</h1>
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
                    <ChevronLeftIcon className="w-5 h-5 " aria-hidden="true" />
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
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TSB pageName="insurance" />
    </div>
  );
}
export async function getServerSideProps(context: any) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/insurance/getAll`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }),
    }
  );
  let data = await response.json();
  let TotalTa2meen = data.data.reduce(
    (acc: any, curr: { FinalValue: any }) => acc + curr.FinalValue,
    0
  );

  return {
    props: {
      data: data.data,
      TotalTa2meenValue: TotalTa2meen,
    },
  };
}

export default Insurance;
