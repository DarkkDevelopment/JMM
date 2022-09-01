import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import axios from "../../utils/axios";
import { PayrolModel } from "../../models/payrolModel";
import { NoDataComponent } from "../../components/NoDataComponent";
import { numberOfItemsPerPage } from "../../utils/constants";
import {
  InsuranceModel,
  sendInsuranceModel,
} from "../../models/insuranceModel";
import { sendTaxesModel, TaxesModel } from "../../models/taxesModel";
import { InferGetServerSidePropsType } from "next";
import { getInsurancePercentageRatio } from "../../controllers/InsuranceController";
import MonthSeed from "../../utils/MonthsSeed";
import { DropDownDateComp } from "../../components/DropDownDateComp";
import { Alert } from "../../services/alerts/Alert";
import { ToastContainer } from "react-toastify";

function Money(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const InsuranceModels: InsuranceModel[] = props.newInsurance;
  const TaxesModels: TaxesModel[] = props.newTaxes;
  const InsuranceRatios = props.ratios;
  const InsurancePersonPercentage = InsuranceRatios.percentageRatioOfPerson;
  const InsuranceSherkaPercentage = InsuranceRatios.percentageRatioOfSherka;
  const [isMonthSearch, setIsMonthSearch] = useState(false);
  const InsuranceModelsToBeFilled: sendInsuranceModel[] = [];
  const TaxesModelsToBeFilled: sendTaxesModel[] = [];
  const [filteredEmployees, setFilteredEmployees] = useState<PayrolModel[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisted = pageNumber * numberOfItemsPerPage;
  const [filterDate, setFilterDate] = useState(new Date());
  const [old, setOld] = useState(false);
  const [month, setMonth] = useState<string>(
    MonthSeed.find((month) => month.id === new Date().getMonth() + 1)!.name
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const pageCount = Math.ceil(filteredEmployees.length / numberOfItemsPerPage);
  const handleChangePage = (link: any) => {
    setPageNumber(link - 1);
  };
  var links = [];
  for (var i = 1; i <= pageCount; i++) {
    links.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const monthNo = MonthSeed.find((months) => months.name === month)!.id;
      const response = await axios.post(
        "/api/HR_Endpoints/payrol/getPayrolHistory",
        {
          month: monthNo,
          year: Number.parseInt(year),
        }
      );
      setFilteredEmployees(response.data.data);
    };
    const checkForPayrol = async () => {
      const monthNo = MonthSeed.find((months) => months.name === month)!.id;
      const response = await axios({
        method: "POST",
        url: "/api/HR_Endpoints/payrol/checkIfPayrolExists",
        data: {
          date: new Date(Number.parseInt(year), monthNo - 1, 1),
        },
      });
      setOld(response.data);
    };
    checkForPayrol();
    fetchData();
  }, [isMonthSearch, month, year]);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    InsuranceModels.forEach((insuranceModel) => {
      InsuranceModelsToBeFilled.push({
        PersonCode: insuranceModel.PersonCode,
        PersonTa2meenValueAtThatMonth: insuranceModel.PersonInsuranceValue,
        Ta2meenPercentagePaidBySherkaAtThatMonth:
          insuranceModel.InsuranceBySherkaPercentage,
        Ta2meenPercentagePaidByPersonAtThatMonth: InsurancePersonPercentage,
        Ta2meenValuePaidByPersonAtThatMonth:
          insuranceModel.PersonInsuranceValue * InsurancePersonPercentage,
        Ta2meenValuePaidBySherkaAtThatMonth:
          insuranceModel.PersonInsuranceValue * InsuranceSherkaPercentage,
        Month: insuranceModel.Month,
        Year: insuranceModel.Year,
      });
    });
    TaxesModels.forEach((taxesModel) => {
      TaxesModelsToBeFilled.push({
        PersonCode: taxesModel.PersonCode,
        PersonMorattabAtThatMonth: taxesModel.PersonMorattab,
        PersonDarayebPercentageAtThatMonth: taxesModel.TaxesPercentage,
        TotalValueOfDarayeb: taxesModel.TaxesValue,
        Month: filterDate.getMonth() + 1,
        Year: filterDate.getFullYear(),
      });
    });
    const monthNo = MonthSeed.find((months) => months.name === month)!.id;
    await axios({
      method: "POST",
      url: "/api/HR_Endpoints/payrol/sendPayrol",
      data: {
        month: monthNo,
        year: Number.parseInt(year),
        payrol: filteredEmployees,
        Insurance: InsuranceModelsToBeFilled,
        Taxes: TaxesModelsToBeFilled,
      },
    })
      .then(() => {
        setOld(true);
        Alert.Success("تم تقفيل الشهر بنجاح");
      })
      .catch((err) => {
        Alert.Error("حدث خطأ اثناء تقفيل الشهر");
      });
  };

  return (
    <div className="flex flex-row bg-gray-100 ">
      <ToastContainer />
      <div className="font-display basis-5/6">
        <div className="flex flex-col p-10 pr-20">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row justify-center space-x-10">
              <DropDownDateComp
                month={month}
                year={year}
                setMonth={setMonth}
                setYear={setYear}
              />
            </div>
          </div>
          {filteredEmployees.length > 0 ? (
            <>
              <div className="flex flex-col p-10 bg-white shadow-xl space-y-7 rounded-3xl">
                <table className="text-right border-collapse table-auto font-display">
                  <thead className="text-right text-white bg-blue-900">
                    <tr>
                      <th className="w-20 p-4 text-right border-b-2">
                        الاجمالي
                      </th>
                      <th className="w-20 p-4 text-right border-b-2">
                        البدالات
                      </th>
                      <th className="w-20 p-4 text-right border-b-2">
                        العلاوات
                      </th>
                      <th className="w-20 p-4 text-right border-b-2">السلف</th>
                      <th className="w-20 p-4 text-right border-b-2">
                        التأمينات
                      </th>
                      <th className="w-20 p-4 text-right border-b-2">
                        الخصومات
                      </th>

                      <th className="w-20 p-4 text-right border-b-2">
                        الحوافز
                      </th>
                      <th className="w-20 p-4 text-right border-b-2 ">
                        أساس المرتب
                      </th>
                      <th className="w-20 p-4 text-right border-b-2">
                        اسم الموظف
                      </th>
                    </tr>
                  </thead>
                  <tbody className="p-10">
                    {filteredEmployees
                      .slice(pagesVisted, pagesVisted + numberOfItemsPerPage)
                      .map((employee) => (
                        <tr key={employee.PersonCode} className="p-10">
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {Math.floor(employee.NetSalary)}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.badalatValue}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.elawatValue}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.TotalValueOfSolafTakenAtThatMonth}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.TotalValueOfTa2meenAtThatMonth}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.TotalKhasmSummationValue}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.TotalHafezSummationValue}
                          </td>
                          <td className="justify-center p-4 text-right border-b-2 ">
                            {employee.PersonMorattabAtThatMonth}
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
              </div>
              {old ? null : (
                <div className="flex flex-col items-center justify-center mt-5">
                  <button
                    style={{
                      backgroundColor: isHovering ? "#FF0606" : "#FC7979",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "1.5rem",
                      padding: "10px",
                      width: "200px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    disabled={old}
                    onClick={sendData}
                  >
                    تقفيل الشهر
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col p-10 bg-white shadow-xl space-y-7 rounded-3xl">
              <NoDataComponent />
            </div>
          )}
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
      <SideBar pageName="money" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const getNewInsurance = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/insurance/getAll`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }),
    }
  );
  const getNewInsuranceData = await getNewInsurance.json();

  const getNewTaxes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/taxes/getTaxesHistory`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      }),
    }
  );
  const getNewTaxesData = await getNewTaxes.json();

  const getRatios = await getInsurancePercentageRatio();

  return {
    props: {
      newInsurance: await getNewInsuranceData.data,
      newTaxes: await getNewTaxesData.data,
      ratios: getRatios,
    },
  };
}

export default Money;
