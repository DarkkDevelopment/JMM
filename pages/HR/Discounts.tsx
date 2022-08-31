import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axios";
import React, { ReactPropTypes, useEffect, useState } from "react";
import DiscountCard from "../../components/DiscountCard";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { KhasmModelHistory } from "../../models/khasmModel";
import { Alert } from "../../services/alerts/Alert";
import { ToastContainer } from "react-toastify";
import Dropdown from "../../components/DropDown";

// @ts-ignore
function Discounts(props) {
  const [filterDate, setFilterDate] = useState(new Date());
  const [searchterm, setSearchTerm] = useState("");
  let [years, setYears] = useState<{ id: number; name: string }[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [filteredEmployeesBackup, setFilteredEmployeesBackup] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState<
    KhasmModelHistory[]
  >([]);
  const [discountsReasons, setDiscountReasons] = useState([]);

  useEffect(() => {
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

  const deleteHafez = async (id: number) => {
    await axios
      .post(`/api/HR_Endpoints/khasm/delete`, {
        id,
      })
      .then(() => {
        Alert.Success("تم حذف الخصم بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        Alert.Error("حدث خطأ اثناء حذف الخصم");
      });
  };

  useEffect(() => {
    let yearsArr = [];
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      yearsArr.push({
        id: i,
        name: i.toString(),
      });
    }
    setYears(yearsArr);
    const fetchData = async () => {
      let response = await axios({
        method: "post",
        url: "/api/HR_Endpoints/khasm/get",
        data: {
          year: year,
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
  }, [year]);

  return (
    <div className="flex flex-row bg-gray-100">
      <div className="fmr-10 font-display basis-5/6">
        <div className="flex flex-col m-10">
          <div className="flex justify-center mb-4">
            <Dropdown
              options={years!}
              value={year}
              onChange={async (val: number) => {
                setYear(val);
              }}
            />
          </div>
          <div className="flex flex-col">
            <ToastContainer />
            <div className="flex flex-col justify-center">
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
                    history={emp.khasmHistory}
                    lastMonthClosed={emp.lastMonthClosed}
                    lastYearClosed={emp.lastYearClosed}
                    deleteHafez={deleteHafez}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <SideBar pageName="discounts" />
    </div>
  );
}

export default Discounts;
