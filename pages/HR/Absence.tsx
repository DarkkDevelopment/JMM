import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import Switch from "../../components/Switch";
import { GetAbsenceModel } from "../../models/GheyabModels";
import { VacationsModel } from "../../models/vacationsModel";

const Absence = (props: any) => {
  const [Absence, setAbsence] = useState<GetAbsenceModel[]>([]);
  const [Vacations, setVacations] = useState<VacationsModel[]>([]);

  const [filterDate, setFilterDate] = useState(new Date());

  // todo : useEffect to get Absence Of The Day

  useEffect(() => {
    const getGheyabOfTheFilteredDate = async () => {
      const GheyabHistory = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/absence/get`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: filterDate,
          }),
        }
      );
      const GheyabHistoryJson = await GheyabHistory.json();
      setAbsence(GheyabHistoryJson);
    };
    getGheyabOfTheFilteredDate();
  }, [filterDate]);

  useEffect(() => {
    const getVacationHistoryAtFilteredDate = async () => {
      const VacationHistory = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/vacations/getVacationsAtThatDay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: filterDate,
          }),
        }
      );
      const VacationHistoryJson = await VacationHistory.json();
      setVacations(VacationHistoryJson);
    };
    getVacationHistoryAtFilteredDate();
  }, [filterDate]);

  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="font-display basis-5/6">
        <div className="flex flex-col p-10">
          <div className="flex flex-row pr-10 font-display">
            <div className="flex flex-row justify-evenly">
              <input
                type="date"
                value={filterDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  setFilterDate(new Date(e.target.value));
                }}
                className="
            my-3
            px-4
            py-2
            text-right
            appearance-none
            shadow-lg
            border rounded w-[15vw]  text-black leading-tight focus:outline-none focus:border-blue-500 
            "
              />
            </div>
          </div>

          <div className="flex flex-col justify-center p-10 mr-16 bg-white shadow-xl space-y-7 ">
            <p className="flex flex-row justify-center space-x-10 text-3xl text-center text-black font-display">
              <div> الغياب</div>
              <div> &quot;{filterDate.toLocaleDateString()}&quot; </div>
            </p>
            <table
              title="الغياب"
              className="text-center border-collapse table-auto font-display"
            >
              <thead className="text-center text-white bg-blue-900">
                <tr>
                  <th className="w-20 p-4 text-center border-b-2 "></th>
                  <th className="w-5 p-4 text-center border-b-2">
                    معامل الغياب
                  </th>

                  <th className="w-20 p-4 text-center border-b-2 ">الكود</th>
                  <th className="w-20 p-4 text-center border-b-2 ">الاسم</th>
                </tr>
              </thead>
              <tbody className="p-10">
                {Absence.map((obj: GetAbsenceModel) => {
                  return (
                    <tr key={obj.PersonCode}>
                      <td className="p-4 border-b-2">
                        {" "}
                        <Switch
                          old={true}
                          type={false}
                          toggleSwitch={(value: boolean) => {}}
                        />
                      </td>
                      <td className="p-4 border-b-2">{obj.GheyabDayRatio}</td>
                      <td className="p-4 border-b-2">{obj.PersonCode}</td>
                      <td className="p-4 border-b-2">
                        {obj.PersonName.PersonFirstName +
                          " " +
                          obj.PersonName.PersonSecondName +
                          " " +
                          obj.PersonName.PersonThirdName +
                          " " +
                          obj.PersonName.PersonFourthName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-center p-10 mt-5 mr-16 bg-white shadow-xl space-y-7 ">
            <p className="flex flex-row justify-center space-x-10 text-3xl text-center text-black font-display">
              <div> الاجازات</div>
              <div> &quot;{filterDate.toLocaleDateString()}&quot; </div>
            </p>
            <table
              title="الاجازات"
              className="text-center border-collapse table-auto font-display"
            >
              <thead className="text-center text-white bg-blue-900">
                <tr>
                  <th className="w-5 p-4 text-center border-b-2">
                    نوع الاجازة
                  </th>
                  <th className="w-20 p-4 text-center border-b-2 ">الكود</th>
                  <th className="w-20 p-4 text-center border-b-2 ">الاسم</th>
                </tr>
              </thead>
              <tbody className="p-10">
                {Vacations.map((obj: VacationsModel) => {
                  return (
                    <tr key={obj.PersonCode}>
                      <td className="p-4 border-b-2">{obj.VacationType}</td>
                      <td className="p-4 border-b-2">{obj.PersonCode}</td>
                      <td className="p-4 border-b-2">
                        {obj.PersonName.PersonFirstName +
                          " " +
                          obj.PersonName.PersonSecondName +
                          " " +
                          obj.PersonName.PersonThirdName +
                          " " +
                          obj.PersonName.PersonFourthName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SideBar pageName="absence" />
    </div>
  );
};

export default Absence;