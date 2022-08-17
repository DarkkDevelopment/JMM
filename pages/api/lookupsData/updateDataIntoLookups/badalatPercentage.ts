import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/badalatPercentage

const updateBadalatPercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const value = req.body.value;
    const updatedBadalatPercentage = await prisma.fixedGlobalValues.update({
      where: {
        Name: "BadalatPercentage",
      },
      data: {
        Value: Number(value),
      },
    });
    res.status(200).json(updatedBadalatPercentage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default updateBadalatPercentage;
