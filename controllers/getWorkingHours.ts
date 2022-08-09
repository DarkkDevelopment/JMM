import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const getWorkingHours = async () => {
  const hours = await prisma.workingHoursLookup.findFirst({
    select: {
      StartTime: true,
      EndTime: true,
    },
  });
  const { StartTime, EndTime } = hours!;
  const NumberOfWorkingHours =
    Number(hours?.EndTime) - Number(hours?.StartTime);
  return { NumberOfWorkingHours, StartTime, EndTime };
};

export default getWorkingHours;
