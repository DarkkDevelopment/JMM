import axios from "axios";
import React, { useEffect, useState } from "react";
import IncentiveCard from "../../components/IncentiveCard";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { IHafez } from "../../interfaces/Hafez";
// @ts-ignore
function Incentive(props) {
  const [filterDate, setFilterDate] = useState(new Date());
  const [searchterm, setSearchTerm] = useState("");
  const [filteredEmployeesBackup, setFilteredEmployeesBackup] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState<IHafez[]>([]);
  const [hwafezReasons, setHwafezReasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.post("/api/HR_Endpoints/hawafez/get", {
        month: filterDate.getMonth() + 1,
        year: filterDate.getFullYear(),
      });
      let hwafezRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/getHawafezReasons"
      );
      let hwafezReasons = hwafezRes.data.map((x: any) => {
        return { id: x.ReasonID, name: x.ReasonDescription };
      });
      setHwafezReasons(hwafezReasons);
      setFilteredEmployees(response.data);
    };
    fetchData();
  }, [filterDate]);

  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="mr-10 font-display basis-5/6">
        <div className="flex flex-col m-10">
          <div className="flex flex-col pl-10 mr-10">
            <div className="flex flex-col justify-center space-y-10">
              {filteredEmployees.map((obj) => (
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SideBar pageName="incentive" />
    </div>
  );
}

export default Incentive;
