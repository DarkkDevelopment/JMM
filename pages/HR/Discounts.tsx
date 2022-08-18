import 'react-toastify/dist/ReactToastify.css';
import axios from "../../utils/axios";
import React, { ReactPropTypes, useEffect, useState } from "react";
import DiscountCard from "../../components/DiscountCard";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { KhasmModelHistory } from "../../models/khasmModel";
import { Alert } from '../../services/alerts/Alert';
import { ToastContainer } from 'react-toastify';

// @ts-ignore
function Discounts(props) {
  const [filterDate, setFilterDate] = useState(new Date());
  const [searchterm, setSearchTerm] = useState("");
  const [filteredEmployeesBackup, setFilteredEmployeesBackup] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState<KhasmModelHistory[]>([]);
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

  const deleteHafez = async (id: number) => {
    await axios.post(`/api/HR_Endpoints/khasm/delete`, {
      id
    }).then(() => {
      Alert.Success('تم حذف الخصم بنجاح');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch(err => {
      Alert.Error('حدث خطأ اثناء حذف الخصم');
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios({
        method: "post",
        url: "/api/HR_Endpoints/khasm/get",
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
      <div className="font-display basis-5/6 ">
        <div className="flex flex-col m-10 ">
          <ToastContainer />
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
      <SideBar pageName="discounts" />
    </div>
  );
}

export default Discounts;
