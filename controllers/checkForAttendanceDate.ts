import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const checkForAttendanceByDayMonthYear = async (
  Day: number,
  Month: number,
  Year: number
) => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const currentDay = date.getDate();
  if (Day === currentDay && Month === currentMonth && Year === currentYear) {
    return true;
  } else {
    return false;
  }
};

const checkIfAttendanceIsAlreadyTakenForTodayDate = async (
  date: Date
): Promise<boolean> => {
  const attendance = await prisma.personHodoorEnseraf.findMany({
    where: {
      Date: date,
    },
  });
  const absence = await prisma.gheyabHistory.findMany({
    where: {
      GheyabDate: date,
    },
  });
  if (attendance.length > 0 || absence.length > 0) {
    return true;
  } else {
    return false;
  }
};

export {
  checkForAttendanceByDayMonthYear,
  checkIfAttendanceIsAlreadyTakenForTodayDate,
};
