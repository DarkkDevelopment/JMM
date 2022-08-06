import prisma from "../lib/prisma";

const getGheyabDayRatio = async () => {
  const GheyabDayRatio = await prisma.fixedHafezAndKhasmRatios.findFirst({
    select: { FixedKhasmDayRatio: true },
  });
  return GheyabDayRatio;
};

export default getGheyabDayRatio;
