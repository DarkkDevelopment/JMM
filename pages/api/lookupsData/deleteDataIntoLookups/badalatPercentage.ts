import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/badalatPercentage

const deleteBadalatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const badalatPercentage = await prisma.fixedGlobalValues.delete({
      where: {
        Name: "BadalatPercentage",
      },
    });
    res.status(200).json(badalatPercentage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteBadalatPercentage;
