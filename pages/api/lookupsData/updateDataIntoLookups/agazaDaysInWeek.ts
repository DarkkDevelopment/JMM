import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/agazaDaysInWeek

const updateAgazaDaysInWeek = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const agazaDayName = req.body.agazaDayName;
  const agazaDayId = req.body.agazaDayId;
  const newAgazaDaysInWeek = await prisma.agazaDaysInWeek.update({
    where: {
      id: agazaDayId,
    },
    data: {
      DayName: agazaDayName,
    },
  });
  res.status(200).json(newAgazaDaysInWeek);
};

export default updateAgazaDaysInWeek;
