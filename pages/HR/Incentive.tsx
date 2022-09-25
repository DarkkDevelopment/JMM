import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import IncentiveCard from "../../components/IncentiveCard";
import SideBar from "../../components/sideBar";
import { HawafezModelHistory } from "../../models/hawafezModel";
import { getHwafezService } from "../../services/Hr/hwafezService";
import axios from "../../utils/axios";
import { Alert } from "../../services/alerts/Alert";
import { ToastContainer } from "react-toastify";
import Dropdown from "../../components/DropDown";
import { InferGetServerSidePropsType } from "next";
import TSB from "../../components/TSB";
import SearchField from "../../components/searchField";

function Incentive(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const hawafezModelsData = props.data;
  const hawafezReasonsProps = props.reasons;
  const [filteredEmployees, setFilteredEmployees] =
    useState<HawafezModelHistory[]>();
  const [hwafezReasons, setHwafezReasons] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const deleteHafez = async (id: number) => {
    await axios
      .post(`/api/HR_Endpoints/hawafez/delete`, {
        id,
      })
      .then(() => {
        Alert.Success("تم حذف الحافز بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        Alert.Error("حدث خطأ حاول مرة اخرى");
      });
  };

  const [years, setYears] = useState<{ id: number; name: string }[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    let yearsArr = [];
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      yearsArr.push({
        id: i,
        name: i.toString(),
      });
    }
    setYears(yearsArr);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEmployees(hawafezModelsData);
      setHwafezReasons(hawafezReasonsProps);
    } else {
      let filteredEmployeesCopy = hawafezModelsData.filter((obj: any) => {
        return (
          obj.PersonName.PersonFirstName.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) || obj.PersonCode.toString().includes(searchTerm)
        );
      });
      setFilteredEmployees(filteredEmployeesCopy);
    }
  }, [hawafezModelsData, hawafezReasonsProps, searchTerm]);

  const handleYearChange = async (val: number) => {
    setYear(val);
    const response = await getHwafezService(year);
    setFilteredEmployees(response.data);
  };

  return (
    <div className="flex flex-row bg-gray-100">
      <div className="mr-10 font-display basis-5/6">
        <div className="flex flex-col m-10">
          <div className="flex flex-row justify-center mb-4 space-x-10">
            <SearchField setSearchTerm={setSearchTerm} />
            <Dropdown
              options={years!}
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className="flex flex-col">
            <ToastContainer />
            <div className="flex flex-col justify-center">
              {filteredEmployees?.map((obj) => {
                return (
                  <IncentiveCard
                    key={obj.PersonCode}
                    PersonCode={obj.PersonCode}
                    name={
                      obj.PersonName.PersonFirstName +
                      " " +
                      obj.PersonName.PersonSecondName +
                      " " +
                      obj.PersonName.PersonThirdName +
                      " " +
                      obj.PersonName.PersonFourthName
                    }
                    totalIncentive={obj.totalHawafezinThatMonth}
                    title="حافز"
                    hwafezReasons={hwafezReasons}
                    history={obj.HafezHistory}
                    lastMonthClosed={obj.lastMonthClosed}
                    lastYearClosed={obj.lastYearClosed}
                    deleteHafez={deleteHafez}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <TSB pageName="incentive" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let response = await getHwafezService(new Date().getFullYear());
  let hwafezRes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookupsData/getDataFromLookups/getHawafezReasons`
  );
  let hawafezResJson = await hwafezRes.json();
  let hwafezReasons = hawafezResJson.map((x: any) => {
    return { id: x.ReasonID, name: x.ReasonDescription };
  });
  return {
    props: {
      data: response.data,
      reasons: hwafezReasons,
    },
  };
}

export default Incentive;
