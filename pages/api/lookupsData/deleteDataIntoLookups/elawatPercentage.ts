import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/elawatPercentage

const deleteElawatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const deletedElawatPercentage = await prisma.fixedGlobalValues.delete({
      where: {
        Name: "ElawatPercentage",
      },
    });
    res.status(200).json(deletedElawatPercentage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteElawatPercentage;
