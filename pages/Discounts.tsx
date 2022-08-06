/* eslint-disable @next/next/no-img-element */
import axios from "../utils/axios";
import React, { ReactPropTypes, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DiscountCard from "../components/DiscountCard";
import SearchField from "../components/searchField";
import SideBar from "../components/sideBar";
import { IKhasm } from "../interfaces/khasm";

function Discounts(props: ReactPropTypes) {
  const [filterDate, setFilterDate] = useState(new Date());
  const [searchterm, setSearchTerm] = useState("");
  const [filteredEmployeesBackup, setFilteredEmployeesBackup] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState<IKhasm[]>([]);
  const [discountsReasons, setDiscountReasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.post("/api/khasm/get", {
        month: filterDate.getFullYear(),
        year: filterDate.getMonth() + 1,
      });
      let khasmRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/getKhsomatReasons"
      );
      let discountsReasons = khasmRes.data.map((x: any) => {
        return { id: x.ReasonID, name: x.ReasonDescription };
      });
      setDiscountReasons(discountsReasons);
      setFilteredEmployees(response.data);
    };
    let filteredEmployeesCopy = filteredEmployeesBackup.filter((obj) => {
      return (
        // @ts-ignore
        obj.name.toLowerCase().includes(searchterm.toLowerCase()) ||
        // @ts-ignore
        obj.code.includes(searchterm)
      );
    });
    if (searchterm != "") {
      setFilteredEmployees(filteredEmployeesCopy);
    } else {
      setFilteredEmployees(filteredEmployeesBackup);
    }
  }, [filterDate, filteredEmployeesBackup, searchterm]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios({
        method: "post",
        url: "/api/khasm/get",
        data: {
          month: filterDate.getMonth() + 1,
          year: filterDate.getFullYear(),
        },
      });
      let khasmRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/getKhsomatReasons"
      );
      let discountsReasons = khasmRes.data.map((x: any) => {
        return { id: x.ReasonID, name: x.ReasonDescription };
      });
      setDiscountReasons(discountsReasons);
      setFilteredEmployees(response.data);
    };
    fetchData();
  }, [filterDate]);

  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="font-display basis-5/6">
        <div className="flex flex-col m-10 ">
          <div className="flex flex-row   justify-center   space-x-80 ">
            <SearchField setSearchTerm={setSearchTerm} />
            <DatePicker
              className="
            m-3
            px-4
            pr-24
            py-3
            text-right
            appearance-none
            shadow-lg
            border rounded w-[15vw]  text-black leading-tight focus:outline-none focus:border-blue-500 
            "
              selected={filterDate}
              onChange={(date: Date) => setFilterDate(date)}
            />
            </div>
            <div className="flex flex-col justify-center space-y-10">
              {filteredEmployees.map((emp) => {
                return (
                  <DiscountCard
                    key={emp.PersonCode}
                    PersonCode={emp.PersonCode}
                    name={
                      emp.PersonName.PersonFirstName +
                      " " +
                      emp.PersonName.PersonSecondName +
                      " " +
                      emp.PersonName.PersonThirdName +
                      " " +
                      emp.PersonName.PersonFourthName
                    }
                    totalKhasminThatMonth={emp.totalKhasminThatMonth}
                    title="خصم"
                    discountReasons={discountsReasons}
                  />
                );
              })}
            
          </div>
        </div>
      </div>
      <SideBar pageName="discounts" />
    </div>
  );
}

export default Discounts;
