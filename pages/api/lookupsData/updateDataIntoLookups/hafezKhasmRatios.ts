import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/hafezKhasmRatios

const updateHafezAndkhasmRatios = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const hafezDayRatio = req.body.hafezDayRatio;
  const hafezHourRatio = req.body.hafezHourRatio;
  const khasmHourRatio = req.body.khasmHourRatio;
  const khasmDayRatio = req.body.khasmDayRatio;
  const idOfHafezKhasmRatios = req.body.idOfHafezKhasmRatios;
  const insertInTable = await prisma.fixedHafezAndKhasmRatios.update({
    where: {
      id: idOfHafezKhasmRatios,
    },
    data: {
      FixedHafezDayRatio: hafezDayRatio,
      FixedHafezHourRatio: hafezHourRatio,
      FixedKhasmHourRatio: khasmHourRatio,
      FixedKhasmDayRatio: khasmDayRatio,
    },
  });
  res.status(200).json(insertInTable);
};

export default updateHafezAndkhasmRatios;
