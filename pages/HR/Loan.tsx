import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import LoansCard from "../../components/LoansCard";
import SideBar from "../../components/sideBar";
import { SolfaModel } from "../../models/SolfaModel";
import axios from "../../utils/axios";
import { Alert } from "../../services/alerts/Alert";
import { ToastContainer } from "react-toastify";
import Dropdown from "../../components/DropDown";

function Loan() {
  const [filteredEmployees, setFilteredEmployees] = useState<SolfaModel[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  let [years, setYears] = useState<{ id: number; name: string }[]>([]);

  const deleteSolfa = async (id: number) => {
    await axios
      .post(`/api/HR_Endpoints/loan/delete`, {
        id,
      })
      .then((res) => {
        Alert.Success("تم حذف السلفة بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        Alert.Error("حدث خطأ اثناء حذف السلفة");
      });
    //   window.location.reload();
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "/api/HR_Endpoints/loan/getLoanHistory",
        {
          year,
        }
      );
      setFilteredEmployees(response.data);
    };
    let yaersArr = [];
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      yaersArr.push({
        id: i,
        name: i.toString(),
      });
    }
    setYears(yaersArr);
    fetchData();
  }, [year]);

  return (
    <div className="flex flex-row bg-gray-100">
      <ToastContainer />
      <div className="flex justify-center m-10 font-display basis-5/6">
        <div className="flex flex-col justify-center space-y-10">
          <div className="flex flex-row justify-around">
            <Dropdown
              options={years!}
              value={year}
              onChange={async (val: number) => {
                setYear(val);
              }}
            />
          </div>
          <div className="flex flex-row space-x-10"></div>

          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((obj) => (
              <LoansCard
                key={obj.PersonCode}
                name={
                  obj.PersonName.PersonFirstName +
                  " " +
                  obj.PersonName.PersonSecondName +
                  " " +
                  obj.PersonName.PersonThirdName +
                  " " +
                  obj.PersonName.PersonFourthName
                }
                code={obj.PersonCode}
                limit={obj.SolfaLimitAtThatMonth}
                history={obj.history}
                lastMonthClosed={obj.lastMonthClosed}
                lastYearClosed={obj.lastYearClosed}
                deleteSolfa={deleteSolfa}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center space-y-10">
              <h1 className="text-2xl text-center font-display">
                لا يوجد سلفات
              </h1>
            </div>
          )}
        </div>
      </div>
      <SideBar pageName="loan" />
    </div>
  );
}

export default Loan;
