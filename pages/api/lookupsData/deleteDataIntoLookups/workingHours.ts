import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/workingHours

const updateWorkingHours = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const workingHoursId = req.body.workingHoursId;
  const deletedWorkingHours = await prisma.workingHoursLookup.delete({
    where: {
      id: workingHoursId,
    },
  });
  res.status(200).json(deletedWorkingHours);
};

export default updateWorkingHours;
