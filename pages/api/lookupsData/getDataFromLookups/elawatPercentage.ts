import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/getDataFromLookups/elawatPercentage

const getElawatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const ElawatPercentage = await prisma.fixedGlobalValues.findFirst({
      where: {
        Name: "ElawatPercentage",
        deletedAt: null,
      },
    });
    res.status(200).json(ElawatPercentage?.Value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getElawatPercentage;
