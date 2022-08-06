import { NextApiRequest, NextApiResponse } from "next";
import {
  renderNewAttendance,
  renderOldAttendance,
} from "../../../controllers/attendanceController";

import {
  checkForAttendanceByDayMonthYear,
  checkIfAttendanceIsAlreadyTakenForTodayDate,
} from "../../../controllers/checkForAttendanceDate";

// http://localhost:3000/api/attendance/get

const attendanceHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const date: Date = req.body.AttendanceDate;
    const myDate = new Date(date);
    const checkDate = checkForAttendanceByDayMonthYear(
      myDate.getDate(),
      myDate.getMonth() + 1,
      myDate.getFullYear()
    );
    if (
      (await checkDate) &&
      !(await checkIfAttendanceIsAlreadyTakenForTodayDate(myDate))
    ) {
      const newAttendance = await renderNewAttendance(myDate);
      res.status(200).json(newAttendance);
    } else {
      const oldAttendance = await renderOldAttendance(myDate);
      res.status(200).json(oldAttendance);
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export default attendanceHistory;
