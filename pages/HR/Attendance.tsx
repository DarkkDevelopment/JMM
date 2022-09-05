import 'react-toastify/dist/ReactToastify.css';
import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { HedorRowComponent } from "../../components/HedorRowComponent";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { IAttendanceModel } from "../../interfaces/attandance";
import { HedoorModel } from "../../models/AttendanceModels";
import { HawafezModel } from "../../models/hawafezModel";
import { KhasmModel } from "../../models/khasmModel";
import { sendAbsenceModel } from "../../models/GheyabModels";
import { useDispatch } from "react-redux";
import { fetchAttandanceByDate } from "../../utils/redux/features/AttendanceSlice";
import { AppDispatch, RootState } from "../../utils/redux/store";
import { useSelector } from "react-redux";
import { Alert } from '../../services/alerts/Alert';
import { ToastContainer } from 'react-toastify';
// @ts-ignore
function Attendance(props) {
  const [Attendance, setAttendance] = useState<IAttendanceModel[]>([]);
  const [searchterm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const attendanceState = useSelector((state: RootState) => state.attendance);

  useEffect(() => {
    if (attendanceState.employees.length == 0)
      dispatch(fetchAttandanceByDate(new Date()))
  }, []);

  const createNewAttendanceService = async (
    HedoorModelsToBeFilled: HedoorModel[],
    HawafezModelsToBeFilled: HawafezModel[],
    KhasmModelsToBeFilled: KhasmModel[],
    GheyabModelsToBeFilled: sendAbsenceModel[]
  ) => {
    const newAttendanceRequest = await axios({
      method: "post",
      url: "/api/HR_Endpoints/attendance/create",
      data: {
        HedoorModelsToBeFilled,
        HawafezModelsToBeFilled,
        KhasmModelsToBeFilled,
      },
    });
    const newAbsenceRequest = await axios({
      method: "post",
      url: "/api/HR_Endpoints/absence/create",
      data: {
        models: GheyabModelsToBeFilled,
      },
    });
  };

  const sendAttendanceHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let employees = attendanceState.employees;
    const sendAttendanceRequest = employees.map((attendance: any) => {
      let startHourArr = attendance.HodoorTime.split(":");
      let endHourArr = attendance.EnserafTime.split(":");
      let utcStartHour = new Date().setUTCHours(Number(startHourArr[0]), Number(startHourArr[1]));
      let utcEndHour = new Date().setUTCHours(Number(endHourArr[0]), Number(endHourArr[1]));
      /* attendance.EnserafTime = new Date(utcEndHour);
      attendance.HodoorTime = new Date(utcStartHour); */
      return {
        ...attendance,
        EnserafTime: new Date(utcEndHour),
        HodoorTime: new Date(utcStartHour)
      }
    });

    const HedoorModelsToBeFilled: HedoorModel[] = [];
    const HawafezModelsToBeFilled: HawafezModel[] = [];
    const KhasmModelsToBeFilled: KhasmModel[] = [];
    const GheyabModelsToBeFilled: sendAbsenceModel[] = [];

    sendAttendanceRequest.forEach((attendance) => {
      if (attendance.attended) {
        HedoorModelsToBeFilled.push({
          PersonCode: attendance.PersonCode,
          Date: attendanceState.filterDate,
          HodoorTime: attendance.HodoorTime,
          EnserafTime: attendance.EnserafTime,
          TotalNumberOfWorkingHoursAtThatDay:
            attendance.TotalNumberOfWorkingHoursAtThatDay,
          LateHours: attendance.LateHours,
          ExtraHours: attendance.ExtraHours,
        });
        HawafezModelsToBeFilled.push({
          PersonHafezId: attendance.PersonCode,
          DayOfHafez: attendanceState.filterDate.getDate(),
          NumberOfBonusHours: attendance.ExtraHours,
          HafezBonusHourRatio: Number.parseFloat(attendance.ExtraFactor),
          HafezReasonID: 1,
          SubmitPersonCode: attendance.PersonCode,
          MonthOfHafez: attendanceState.filterDate.getMonth() + 1,
          YearOfHafez: attendanceState.filterDate.getFullYear(),
          HafezBonusDayRatio: 0,
          NumberOfBonusDays: 0,
          PureHafezValue: 0,
        });
        KhasmModelsToBeFilled.push({
          PersonKhasmId: attendance.PersonCode,
          DayOfKhasm: attendanceState.filterDate.getDate(),
          KhasGhyabDayRatio: 0,
          KhasmLateHourRatio: Number.parseFloat(attendance.LateFactor),
          KhasmReasonID: 1,
          NumberOfGhyabDays: 0,
          NumberOfLateHours: attendance.LateHours,
          PureKhasmValue: 0,
          SubmitPersonCode: attendance.PersonCode,
          MonthOfKhasm: attendanceState.filterDate.getMonth() + 1,
          YearOfKhasm: attendanceState.filterDate.getFullYear(),
        });
      } else {
        GheyabModelsToBeFilled.push({
          PersonCode: attendance.PersonCode,
          GheyabDate: attendanceState.filterDate,
        });
      }
    });
    createNewAttendanceService(
      HedoorModelsToBeFilled,
      HawafezModelsToBeFilled,
      KhasmModelsToBeFilled,
      GheyabModelsToBeFilled
    );
    Alert.Success('تم حفظ الحضور بنجاح برجاء عدم نسيان اضافة الغياب')
    // window.location.reload();
  };



  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="m-12 font-display basis-5/6">
        <div className="flex flex-row justify-center space-x-72 ">
          <ToastContainer />
          <SearchField setSearchTerm={setSearchTerm} />
          <input
            type="date"
            value={attendanceState.filterDate.toISOString().split("T")[0]}
            onChange={(e) => dispatch(fetchAttandanceByDate(new Date(e.target.value)))}
            className="

            py-2
            text-center
      
            appearance-none
            shadow-md
            border rounded w-[15vw]  text-black leading-tight focus:outline-none focus:border-blue-500 
            "
          />
        </div>

        <div className="flex flex-col justify-center pt-10 pl-10 pr-10 mr-32 bg-white shadow-xl space-y-7 ">
          <p className="flex flex-row justify-center space-x-10 text-3xl text-center text-black font-display">
            <div> الحضور</div>
            <div> &quot;{attendanceState.filterDate.toLocaleDateString()}&quot; </div>
          </p>

          {
            attendanceState.status === 'loading' ? (<div>Loading...</div>) : (<table
              title="الحضور"
              className="text-center border-collapse table-auto font-display"
            >
              <thead className="text-center text-white bg-blue-900">
                <tr>
                  <th className="w-5 p-4 text-center border-b-2"></th>
                  <th className="w-5 p-4 text-center border-b-2">
                    معامل الاضافة
                  </th>
                  <th className="w-5 p-4 text-center border-b-2">معامل الغياب</th>
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
                {attendanceState.employees.map((employee, index) => {
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
                      from={employee.HodoorTime}
                      to={employee.EnserafTime!}
                      attended={employee.attended}
                      old={attendanceState.old}
                      KhasmHourRatio={employee.LateFactor}
                      hafezHourRatio={employee.ExtraFactor}
                      index={index}
                      TotalNumberOfWorkingHoursAtThatDay={
                        Math.floor(employee.TotalNumberOfWorkingHoursAtThatDay)
                      }
                      TotalNumberOfAbsenceHoursAtThatDay={employee.LateHours}
                      TotalNumberOfExtraHoursAtThatDay={employee.ExtraHours}
                    />
                  );
                })}
              </tbody>
            </table>)
          }
        </div>
        <button
          disabled={attendanceState.old}
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
