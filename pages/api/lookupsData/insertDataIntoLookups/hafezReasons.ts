import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/hafezReasons

const createNewReasons = async (req: NextApiRequest, res: NextApiResponse) => {
  const reasonDescription = req.body.reasonDescription;
  const newReason = await prisma.hafezReasons.create({
    data: {
      ReasonDescription: reasonDescription,
    },
  });
  res.status(200).json(newReason);
};

export default createNewReasons;
