import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/mohafzat

const createNewMohafzaEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const mohafzaName = req.body.manteqaName;
  const insertNewMohafza = await prisma.mohafzatLookup.create({
    data: {
      MohafzaName: mohafzaName,
    },
  });
  res.status(200).json(insertNewMohafza);
};

export default createNewMohafzaEndpoint;
