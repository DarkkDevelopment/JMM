import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/getDataIntoLookups/badalatPercentage

const getBadalatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const badalatPercentage = await prisma.fixedGlobalValues.findFirst({
      where: {
        Name: "BadalatPercentage",
        deletedAt: null,
      },
    });
    res.status(200).json(badalatPercentage?.Value);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getBadalatPercentage;
