import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const gethafezAndKhasmRatiosEndpoint = async () => {
  const hafezAndKhasmRatios = await prisma.fixedHafezAndKhasmRatios.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      FixedHafezHourRatio: true,
      FixedKhasmHourRatio: true,
      FixedHafezDayRatio: true,
      FixedKhasmDayRatio: true,
    },
  });
  const hafezHourRatio = hafezAndKhasmRatios[0].FixedHafezHourRatio;
  const khasmHourRatio = hafezAndKhasmRatios[0].FixedKhasmHourRatio;
  const hafezDayRatio = hafezAndKhasmRatios[0].FixedHafezDayRatio;
  const khasmDayRatio = hafezAndKhasmRatios[0].FixedKhasmDayRatio;
  return {
    hafezHourRatio,
    khasmHourRatio,
    hafezDayRatio,
    khasmDayRatio,
  };
};

export default gethafezAndKhasmRatiosEndpoint;
