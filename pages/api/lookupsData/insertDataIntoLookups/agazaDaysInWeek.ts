import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/agazaDaysInWeek

const insertNewAgazaDaysInWeek = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const agazaDayName = req.body.agazaDayName;
  const newAgazaDaysInWeek = await prisma.agazaDaysInWeek.create({
    data: {
      DayName: agazaDayName,
    },
  });
  res.status(200).json(newAgazaDaysInWeek);
};

export default insertNewAgazaDaysInWeek;
