import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/badalatPercentage

const insertBadalatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const value = req.body.value;
    const newBadalatPercentage = await prisma.fixedGlobalValues.create({
      data: {
        Name: "BadalatPercentage",
        Value: Number(value),
      },
    });
    res.status(200).json(newBadalatPercentage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default insertBadalatPercentage;
