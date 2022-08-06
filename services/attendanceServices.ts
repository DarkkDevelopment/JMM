import { HedoorModel } from "../models/AttendanceModels";
import axios from "../utils/axios";

const sendAttendance = async (attendanceModel: HedoorModel[], router: any) => {
  let newAttendanceModel = attendanceModel.map((attendance) => {
    attendance.Date = new Date();
    return attendance;
  });
  console.log(newAttendanceModel);
  const res = await axios({
    method: "post",
    url: "/attendance/create",
    data: newAttendanceModel,
  })
    .then((res) => {
      return res.data && router && router.reload();
    })
    .catch(function (error) {
      return error.response;
    });
  return res;
};

const checkAttendanceHistory = async (dateToCheck: Date) => {
  console.log(dateToCheck);
  const res = await axios({
    method: "post",
    url: "/attendance/get",
    data: {
      DatetoCheck: dateToCheck,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      return error.response;
    });
  return res;
};

const AttendanceServices = {
  sendAttendance,
  checkAttendanceHistory,
};

export default AttendanceServices;
