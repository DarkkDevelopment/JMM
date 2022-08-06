import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/khasmReasons

const createNewReasons = async (req: NextApiRequest, res: NextApiResponse) => {
  const reasonDescription = req.body.reasonDescription;
  const newReason = await prisma.khasmReasons.create({
    data: {
      ReasonDescription: reasonDescription,
    },
  });
  res.status(200).json(newReason);
};

export default createNewReasons;
