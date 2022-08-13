/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import SideBar from "../components/sideBar";
import { IAllEmployeesModel } from "../interfaces/employees";
import { numberOfItemsPerPage } from "../utils/constants";
import { InferGetServerSidePropsType } from "next";
import { getAllEmployees } from "../services/employeesServices";


function Employees(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {

  const router = useRouter();
  const employees: IAllEmployeesModel[] = props.data;
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [searchterm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisted = pageNumber * numberOfItemsPerPage;
  const pageCount = Math.ceil(filteredEmployees.length / numberOfItemsPerPage);
  const handleChangePage = (link: any) => {
    setPageNumber(link - 1);
  };
  var links = [];
  for (var i = 1; i <= pageCount; i++) {
    links.push(i);
  }
  /* useEffect(() => {
    if (searchterm == "") {
      setFilteredEmployees(employees);
    } else {
      let filteredEmployeesCopy = filteredEmployees.filter(
        (obj: IAllEmployeesModel) => {
          if (obj.PersonCode.toString().includes(searchterm)) return obj;
          let name =
            obj.PersonFirstName +
            " " +
            obj.PersonSecondName +
            " " +
            obj.PersonThirdName +
            " " +
            obj.PersonFourthName;
          if (name.includes(searchterm)) return obj;
        }
      );
      setFilteredEmployees(filteredEmployeesCopy);
    }
  }, [employees, filteredEmployees, searchterm]); */

  return (


    <div className="flex flex-row bg-gray-100">
      <div className="bg-gray-100 font-display basis-5/6">

        <div className="flex flex-col flex-1 p-10 space-y-2   jusify-center ">

          <button
            onClick={() => {
              router.push("/AddEmployee");
            }}
            className="px-4 py-2 font-bold text-red-400 border border-red-400 bg-transparent rounded-xl w-[10vw]  hover:bg-red-500 shadow-md font-display hover:text-white"
          >
            اضافة موظف
          </button>
          <div className="flex flex-row font-display">
            <input
              className="mt-3 mb-3 px-4 py-2 text-right shadow appearance-none border rounded w-[10vw]  text-black leading-tight focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              placeholder="بحث "
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="search"
              className="mt-5 ml-3 w-7 h-7"
            />
          </div>

          <div className="flex flex-col pr-10 pt-10 pl-10  mr-10 bg-white shadow-xl space-y-7">
            <table className="text-right border-collapse table-fixed font-display">
              <thead className=" text-right  text-white bg-blue-900">

                <tr>
                  <th className="w-20 p-4 text-right border-b-2"></th>
                  <th className="w-20 p-4 text-right border-b-2">الديانة</th>
                  <th className="w-20 p-4 text-right border-b-2">الكود</th>
                  <th className="w-20 p-4 text-right border-b-2 ">الوظيفة</th>
                  <th className="w-20 p-4 text-right border-b-2">الاسم</th>
                </tr>
              </thead>
              <tbody className="p-10">
                {filteredEmployees
                  .slice(pagesVisted, pagesVisted + numberOfItemsPerPage)
                  .map((employee: IAllEmployeesModel) => (
                    <tr key={employee.PersonCode} className="p-10">
                      <td className="p-4 text-center border-b-2 ">
                        <button
                          onClick={() => {
                            router.push(`/${employee.PersonCode}`);
                          }}
                          className="px-4 py-2 font-bold text-blue-900 bg-transparent border border-blue-500 rounded-xl w-[10vw] hover:bg-blue-900 hover:text-white"
                        >
                          عرض المزيد
                        </button>
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonDyana.DyanaName}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonCode}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonWazeefa.PersonWazeefa.WazeefaName}
                      </td>
                      <td className="justify-center p-4 text-right border-b-2 ">
                        {employee.PersonFirstName +
                          " " +
                          employee.PersonSecondName +
                          " " +
                          employee.PersonThirdName +
                          " " +
                          employee.PersonFourthName}
                      </td>
                    </tr>
                  ))}
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
      <SideBar pageName="employees" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let response = await getAllEmployees();

  return {
    props: response,
  };
}

export default Employees;
