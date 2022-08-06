import { NextApiRequest, NextApiResponse } from "next";
import { sendAttendanceWithHawafezAndKhsomat } from "../../../controllers/attendanceController";

// http://localhost:3000/api/attendance/create

// todo : need to change it to create many

const sendAttendance = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      HedoorModelsToBeFilled,
      HawafezModelsToBeFilled,
      KhasmModelsToBeFilled,
    } = req.body;
    const newAttendance = await sendAttendanceWithHawafezAndKhsomat(
      HedoorModelsToBeFilled,
      HawafezModelsToBeFilled,
      KhasmModelsToBeFilled
    );
    res.status(200).json(newAttendance);
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export default sendAttendance;
