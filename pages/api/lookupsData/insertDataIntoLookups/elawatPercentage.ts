import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/elawatPercentage

const insertElawatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const value = req.body.value;
    const insertedElawatPercentage = await prisma.fixedGlobalValues.create({
      data: {
        Name: "ElawatPercentage",
        Value: Number(value),
      },
    });
    res.status(200).json(insertedElawatPercentage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default insertElawatPercentage;
