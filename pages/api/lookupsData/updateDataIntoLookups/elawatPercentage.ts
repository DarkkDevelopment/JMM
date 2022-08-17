import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/elawatPercentage

const updateElawatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const value = req.body.value;
    const updatedElawatPercentage = await prisma.fixedGlobalValues.update({
      where: {
        Name: "ElawatPercentage",
      },
      data: {
        Value: Number(value),
      },
    });
    res.status(200).json(updatedElawatPercentage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default updateElawatPercentage;
