import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/workingHours

const updateWorkingHours = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const workingHoursId = req.body.workingHoursId;
  const updatedWorkingHours = await prisma.workingHoursLookup.update({
    where: {
      id: workingHoursId,
    },
    data: {
      StartTime: startTime,
      EndTime: endTime,
    },
  });
  res.status(200).json(updatedWorkingHours);
};

export default updateWorkingHours;
