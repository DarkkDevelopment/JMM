import React, { useEffect, useState } from "react";
import SearchField from "../components/searchField";
import SideBar from "../components/sideBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { TaxesModel } from "../models/taxesModel";
import { numberOfItemsPerPage } from "../utils/constants";
import MonthSeed from "../utils/MonthsSeed";
import { DropDownDateComp } from "../components/DropDownDateComp";
import { NoDataComponent } from "../components/NoDataComponent";
import { InferGetServerSidePropsType } from "next";

function Taxes(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const TodayTaxes = props.taxes;
  const employeesTaxesToday = props.employeesTaxes;
  const [month, setMonth] = useState<string>(
    MonthSeed.find((month) => month.id === new Date().getMonth() + 1)!.name
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [isMonthSearch, setIsMonthSearch] = useState(false);
  // todo : get it from constants in utils
  const [filteredEmployees, setFilteredEmployees] =
    useState<TaxesModel[]>(TodayTaxes);
  const [taxes, setTotalTaxes] = useState(employeesTaxesToday);
  const [searchterm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [filterDate, setFilterDate] = useState(new Date());
  const pagesVisted = pageNumber * numberOfItemsPerPage;
  const pageCount = Math.ceil(filteredEmployees.length / numberOfItemsPerPage);
  const handleChangePage = (link: any) => {
    setPageNumber(link - 1);
  };
  var links = [];
  for (var i = 1; i <= pageCount; i++) {
    links.push(i);
  }
  const handleSearchButton = async (e: any) => {
    setIsMonthSearch(!isMonthSearch);
  };
  useEffect(() => {
    const getTaxesTodayFinction = async () => {
      const monthNo = MonthSeed.find((months) => months.name === month)!.id;
      const getTaxesHistoryOfToday = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/taxes/getTaxesHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: monthNo,
            year: Number.parseInt(year),
          }),
        }
      );
      const getTaxesHistoryOfTodayData = await getTaxesHistoryOfToday.json();
      let employeesTaxes = getTaxesHistoryOfTodayData.data.reduce(
        (acc: number, curr: TaxesModel) => {
          return acc + curr.TaxesPercentage * curr.PersonMorattab;
        },
        0
      );
      setTotalTaxes(employeesTaxes);
      setFilteredEmployees(getTaxesHistoryOfTodayData.data);
    };
    getTaxesTodayFinction();
  }, [isMonthSearch, month, year]);

  return (
    <div className=" flex flex-row bg-gray-100 ">
      <div className="pr-10 m-10 font-display basis-5/6">
        <div className="flex flex-row pr-10 space-x-64 justify-between mr-10 ">
        <div className=" mr-10 ">
          <SearchField setSearchTerm={setSearchTerm} />
          </div>
          <button
            className="px-8 py-2 text-2xl mb-5 font-bold text-center text-white bg-blue-500 shadow-lg hover:bg-blue-900 rounded-xl"
            onClick={handleSearchButton}
          >
            بحث
          </button>
          <div className="flex flex-row justify-center space-x-10 ">
            <DropDownDateComp
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
            />
          </div>
        </div>
        <div className="flex flex-col pt-10 pl-10 pr-10 mr-20 bg-white shadow-xl space-y-7 rounded-3xl">
          {filteredEmployees.length > 0 ? (
            <table className="text-right border-collapse table-auto font-display">
              <thead className="text-right text-white bg-blue-900">
                <tr>
                  <th className="w-20 p-4 text-right border-b-2">الاجمالي</th>
                  <th className="w-20 p-4 text-right border-b-2">
                    {" "}
                    نسبة الضرائب
                  </th>
                  <th className="w-20 p-4 text-right border-b-2">المرتب</th>
                  <th className="w-20 p-4 text-right border-b-2 ">
                    رقم التأمين
                  </th>
                  <th className="w-20 p-4 text-right border-b-2">
                    الرقم القومي
                  </th>
                  <th className="w-20 p-4 text-right border-b-2">الكود</th>

                  <th className="w-20 p-4 text-right border-b-2">اسم الموظف</th>
                </tr>
              </thead>
              <tbody className="p-10">
                {filteredEmployees
                  .slice(pagesVisted, pagesVisted + numberOfItemsPerPage)
                  .map((employee) => (
                    <tr key={employee.PersonCode} className="p-10">
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.TaxesPercentage * employee.PersonMorattab}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.TaxesPercentage}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonMorattab}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonInsuranceId}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonNationalId}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonCode}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonName.PersonFirstName +
                          " " +
                          employee.PersonName.PersonSecondName +
                          " " +
                          employee.PersonName.PersonThirdName +
                          " " +
                          employee.PersonName.PersonFourthName}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="mb-6">
              <NoDataComponent />
            </div>
          )}
        </div>
        <div className="flex flex-row items-baseline mx-12 my-8">
          <h1 className="mr-5 text-2xl">جنيه مصري</h1>
          <h1 className="p-4 mr-5 text-2xl text-red-600 bg-white shadow-2xl text-bold space-y-7 rounded-xl">
            {taxes}
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
      <SideBar pageName="taxes" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const getTaxesHistoryOfToday = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/taxes/getTaxesHistory`,
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

  const getTaxesHistoryOfTodayData = await getTaxesHistoryOfToday.json();
  let employeesTaxes = getTaxesHistoryOfTodayData.data.reduce(
    (acc: number, curr: TaxesModel) => {
      return acc + curr.TaxesPercentage * curr.PersonMorattab;
    },
    0
  );
  return {
    props: {
      taxes: getTaxesHistoryOfTodayData.data,
      employeesTaxes: employeesTaxes,
    },
  };
}

export default Taxes;
