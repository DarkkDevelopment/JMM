import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const getWorkingHours = async () => {
  const hours = await prisma.workingHoursLookup.findFirst({
    select: {
      StartTime: true,
      EndTime: true,
    },
  });
  const NumberOfWorkingHours =
    Number(hours?.EndTime) - Number(hours?.StartTime);
  return NumberOfWorkingHours;
};

export default getWorkingHours;
