import { NextApiRequest, NextApiResponse } from "next";
import { checkIfAttendanceIsAlreadyTakenForTodayDate } from "../../../controllers/checkForAttendanceDate";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/attendance/check

const checkForAttendanceAtThatDay = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const date = req.body.date;
  const check = await checkIfAttendanceIsAlreadyTakenForTodayDate(date);
  res.status(200).json(check);
};

export default checkForAttendanceAtThatDay;
