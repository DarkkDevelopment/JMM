import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/workingHours

const insertWorkingHours = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const insertNewWorkingHours = await prisma.workingHoursLookup.create({
    data: {
      StartTime: startTime,
      EndTime: endTime,
    },
  });
  res.status(200).json(insertNewWorkingHours);
};

export default insertWorkingHours;
