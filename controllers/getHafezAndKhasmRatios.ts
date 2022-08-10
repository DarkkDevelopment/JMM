import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

const gethafezAndKhasmRatiosEndpoint = async () => {
  const hafezAndKhasmRatios = await prisma.fixedHafezAndKhasmRatios.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      FixedHafezHourRatio: true,
      FixedKhasmHourRatio: true,
      FixedHafezDayRatio: true,
      FixedKhasmDayRatio: true,
    },
  });
  if (hafezAndKhasmRatios.length > 0) {
    const id = hafezAndKhasmRatios[0].id;
    const hafezHourRatio = hafezAndKhasmRatios[0].FixedHafezHourRatio;
    const khasmHourRatio = hafezAndKhasmRatios[0].FixedKhasmHourRatio;
    const hafezDayRatio = hafezAndKhasmRatios[0].FixedHafezDayRatio;
    const khasmDayRatio = hafezAndKhasmRatios[0].FixedKhasmDayRatio;
    return {
      id,
      hafezHourRatio,
      khasmHourRatio,
      hafezDayRatio,
      khasmDayRatio,
    };
  } else {
    return {
      id: null,
      hafezHourRatio: 0,
      khasmHourRatio: 0,
      hafezDayRatio: 0,
      khasmDayRatio: 0,
    };
  }
};

export default gethafezAndKhasmRatiosEndpoint;
