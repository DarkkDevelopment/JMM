import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HedorRowComponent } from "../components/HedorRowComponent";
import SearchField from "../components/searchField";
import SideBar from "../components/sideBar";
import { AttendanceTable } from "../interfaces/attendance";
import { IAttendanceModel } from "../interfaces/attandance";
import { GetAttendanceModel, HedoorModel } from "../models/AttendanceModels";
import { HawafezModel } from "../models/hawafezModel";
import { KhasmModel } from "../models/khasmModel";
import { sendAbsenceModel } from "../models/GheyabModels";

function Attendance(props: any) {
  const [old, setOld] = useState(false);
  const [Attendance, setAttendance] = useState<IAttendanceModel[]>([]);
  const [searchterm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());

  const workingHoursConstant = 8;

  const onToDateChange = (id: number, date: string) => {
    console.log(date);
    const newAttendance = Attendance.map((attendance) => {
      if (attendance.PersonCode === id) {
        attendance.EnserafTime = date;
        attendance.TotalNumberOfWorkingHoursAtThatDay = calcualateWorkingHours(
          attendance.HodoorTime,
          attendance.EnserafTime
        );
        attendance.LateHours = calculateAbsenceHours(
          workingHoursConstant,
          attendance.TotalNumberOfWorkingHoursAtThatDay
        );
        attendance.ExtraHours = calculateAdditionalHours(
          workingHoursConstant,
          attendance.TotalNumberOfWorkingHoursAtThatDay
        );
      }
      return attendance;
    });
    setAttendance(newAttendance);
  };

  const onFromDateChange = (id: number, date: string) => {
    const newAttendance = Attendance.map((attendance) => {
      if (attendance.PersonCode === id) {
        attendance.HodoorTime = date;
        attendance.TotalNumberOfWorkingHoursAtThatDay = calcualateWorkingHours(
          attendance.HodoorTime,
          attendance.EnserafTime
        );
        attendance.LateHours = calculateAbsenceHours(
          workingHoursConstant,
          attendance.TotalNumberOfWorkingHoursAtThatDay
        );
        attendance.ExtraHours = calculateAdditionalHours(
          workingHoursConstant,
          attendance.TotalNumberOfWorkingHoursAtThatDay
        );
      }
      return attendance;
    });
    setAttendance(newAttendance);
  };

  const calcualateWorkingHours = (heddorTime: string, enserafTime: string): number => {
    const fromSplitted = heddorTime.split(":");
    const hedorHour = parseInt(fromSplitted[0]);
    const hedorMinute = parseInt(fromSplitted[1]);

    const toSplitted = enserafTime.split(":");
    const enserafHour = parseInt(toSplitted[0]);
    const enserafMinute = parseInt(toSplitted[1]);

    const totalHours = enserafHour - hedorHour;
    const totalMinutes = enserafMinute - hedorMinute;
    const totalWorkingHours = totalHours + totalMinutes / 60;

    return totalWorkingHours;
  }

  const calculateAdditionalHours = (
    constHours: number,
    totalWorkingHours: number
  ): number =>
    totalWorkingHours > constHours ? totalWorkingHours - constHours : 0;

  const calculateAbsenceHours = (
    constHours: number,
    totalWorkingHours: number
  ): number =>
    totalWorkingHours < constHours ? constHours - totalWorkingHours : 0;

  const setKhasmHourRatio = (id: number, value: any) => {
    const newAttendance = Attendance.map((attendance) => {
      if (attendance.PersonCode === id) {
        attendance.LateFactor = value;
      }
      return attendance;
    });
    setAttendance(newAttendance);
  };

  const setHafezHourRatio = (id: number, value: any) => {
    const newAttendance = Attendance.map((attendance) => {
      if (attendance.PersonCode === id) {
        attendance.ExtraFactor = value;
      }
      return attendance;
    });
    setAttendance(newAttendance);
  };

  const setAttended = (id: number, attended: boolean) => {
    const newAttendance = Attendance.map((attendance) => {
      if (attendance.PersonCode === id) {
        attendance.attended = attended;
      }
      return attendance;
    });
    setAttendance(newAttendance);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/attendance/get", {
        AttendanceDate: filterDate,
      });

      let newAttendance = response.data.map((attendance: AttendanceTable) => {
        attendance.EnserafTime = attendance
          .EnserafTime!.toString()
          .split("T")[1]
          .slice(0, 5);
        attendance.HodoorTime = attendance
          .HodoorTime!.toString()
          .split("T")[1]
          .slice(0, 5);
        attendance.attended = true;
        return attendance;
      });

      setAttendance(newAttendance);
    };
    fetchData();
  }, [filterDate]);



  const createNewAttendanceService = async (
    HedoorModelsToBeFilled: HedoorModel[],
    HawafezModelsToBeFilled: HawafezModel[],
    KhasmModelsToBeFilled: KhasmModel[],
    GheyabModelsToBeFilled: sendAbsenceModel[]
  ) => {
    const newAttendanceRequest = await axios({
      method: "post",
      url: "/api/attendance/create",
      data: {
        HedoorModelsToBeFilled,
        HawafezModelsToBeFilled,
        KhasmModelsToBeFilled,
      },
    });
    const newAbsenceRequest = await axios({
      method: "post",
      url: "/api/absence/create",
      data: {
        models: GheyabModelsToBeFilled,
      },
    });
  };

  const sendAttendanceHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const sendAttendanceRequest = Attendance.map((attendance: any) => {
      attendance.EnserafTime = new Date(`2022-12-12T${attendance.EnserafTime}:00`);
      attendance.HodoorTime = new Date(`2022-12-12T${attendance.HodoorTime}:00`);
      return attendance;
    });

    const HedoorModelsToBeFilled: HedoorModel[] = [];
    const HawafezModelsToBeFilled: HawafezModel[] = [];
    const KhasmModelsToBeFilled: KhasmModel[] = [];
    const GheyabModelsToBeFilled: sendAbsenceModel[] = [];

    sendAttendanceRequest.forEach((attendance) => {
      if (attendance.attended) {
        HedoorModelsToBeFilled.push({
          PersonCode: attendance.PersonCode,
          Date: filterDate,
          HodoorTime: attendance.HodoorTime,
          EnserafTime: attendance.EnserafTime,
          TotalNumberOfWorkingHoursAtThatDay:
            attendance.TotalNumberOfWorkingHoursAtThatDay,
          LateHours: attendance.LateHours,
          ExtraHours: attendance.ExtraHours,
        });
        HawafezModelsToBeFilled.push({
          PersonHafezId: attendance.PersonCode,
          DayOfHafez: filterDate.getDate(),
          NumberOfBonusHours: attendance.ExtraHours,
          HafezBonusHourRatio: Number.parseFloat(attendance.ExtraFactor),
          HafezReasonID: 1,
          SubmitPersonCode: attendance.PersonCode,
          MonthOfHafez: filterDate.getMonth() + 1,
          YearOfHafez: filterDate.getFullYear(),
          HafezBonusDayRatio: 0,
          NumberOfBonusDays: 0,
          PureHafezValue: 0,
        });
        KhasmModelsToBeFilled.push({
          PersonKhasmId: attendance.PersonCode,
          DayOfKhasm: filterDate.getDate(),
          KhasGhyabDayRatio: 0,
          KhasmLateHourRatio: Number.parseFloat(attendance.LateFactor),
          KhasmReasonID: 1,
          NumberOfGhyabDays: 0,
          NumberOfLateHours: attendance.LateHours,
          PureKhasmValue: 0,
          SubmitPersonCode: attendance.PersonCode,
          MonthOfKhasm: filterDate.getMonth() + 1,
          YearOfKhasm: filterDate.getFullYear(),
        });
      } else {
        GheyabModelsToBeFilled.push({
          PersonCode: attendance.PersonCode,
          GheyabDate: filterDate,
        });
      }
    });
    createNewAttendanceService(HedoorModelsToBeFilled, HawafezModelsToBeFilled, KhasmModelsToBeFilled, GheyabModelsToBeFilled);
  };

  useEffect(() => {
    const checkIfOldOrNewAttendance = async () => {
      const checkForAttendanceIfOldOrNEW = await axios({
        method: "post",
        url: "/api/attendance/check",
        data: {
          date: filterDate,
        },
      });
      setOld(checkForAttendanceIfOldOrNEW.data);
    };
    checkIfOldOrNewAttendance();
  }, [filterDate]);

  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="font-display basis-5/6 m-12">
        <div className="flex flex-row    space-x-64 jestify-between">
          <SearchField setSearchTerm={setSearchTerm} />

          <DatePicker
            className="
            ml-l3
            px-16
            py-2
            text-right
            jestify-center
            appearance-none
            shadow-lg
            border rounded w-[15vw]  text-black leading-tight focus:outline-none focus:border-blue-500 
            "
            selected={filterDate}
            onChange={(date: Date) => setFilterDate(date)}
          />



        </div>
        <div className="flex flex-col justify-center mr-20 pr-10 pt-10 pl-10 bg-white shadow-xl space-y-7 ">
          <p className="text-3xl text-center justify-center text-black font-display">
            الحضور
            &quot;{filterDate.toLocaleDateString()}&quot;
          </p>


          <table
            title="الحضور"
            className="text-center border-collapse table-auto font-display"
          >
            <thead className="text-center text-white bg-blue-900">
              <tr>
                <th className="w-5 p-4 text-center border-b-2"></th>
                <th className="w-5 p-4 text-center border-b-2">
                  معامل الاضافة
                </th>
                <th className="w-5 p-4 text-center border-b-2">
                  معامل الغياب
                </th>
                <th className="w-5 p-4 text-center border-b-2">
                  عدد ساعات الغياب
                </th>
                <th className="w-5 p-4 text-center border-b-2">
                  عدد ساعات العمل الاضافية
                </th>
                <th className="w-5 p-4 text-center border-b-2">
                  عدد ساعات العمل
                </th>
                <th className="w-5 p-4 text-center border-b-2">الي</th>
                <th className="w-5 p-4 text-center border-b-2 ">من</th>
                <th className="w-20 p-4 text-center border-b-2 ">الكود</th>
                <th className="w-20 p-4 text-center border-b-2 ">الاسم</th>
              </tr>
            </thead>
            <tbody className="p-10">
              {Attendance.map((employee, index) => {
                return (
                  <HedorRowComponent
                    key={employee.PersonCode}
                    PersonCode={employee.PersonCode}
                    PersonName={
                      employee.PersonName.PersonFirstName +
                      " " +
                      employee.PersonName.PersonSecondName +
                      " " +
                      employee.PersonName.PersonThirdName +
                      " " +
                      employee.PersonName.PersonFourthName
                    }
                    from={employee.HodoorTime!}
                    to={employee.EnserafTime!}
                    attended={employee.attended}
                    old={old}
                    KhasmHourRatio={employee.LateFactor}
                    hafezHourRatio={employee.ExtraFactor}
                    onToDateChange={onToDateChange}
                    onFromDateChange={onFromDateChange}
                    TotalNumberOfWorkingHoursAtThatDay={
                      employee.TotalNumberOfWorkingHoursAtThatDay
                    }
                    TotalNumberOfAbsenceHoursAtThatDay={employee.LateHours}
                    TotalNumberOfExtraHoursAtThatDay={employee.ExtraHours}
                    onKhasmChange={setKhasmHourRatio}
                    onHafezChange={setHafezHourRatio}
                    onAttendanceChange={setAttended}
                  />
                );
              })}
            </tbody>
          </table>

        </div>
        <button
          disabled={old}
          onClick={sendAttendanceHandler}
          className={
            "px-4 py-2 mt-3 leading-tight text-right text-white bg-blue-400 rounded shadow-lg hover:bg-blue-700 disabled:hover:bg-blue-400"
          }
        >
          حفظ حضور اليوم
        </button>
      </div>
      <SideBar pageName="attendance" />
    </div>
  );
}

export default Attendance;
