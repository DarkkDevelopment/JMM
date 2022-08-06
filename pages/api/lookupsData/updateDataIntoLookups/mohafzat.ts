import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/mohafzat

const updateMohafzat = async (req: NextApiRequest, res: NextApiResponse) => {
  const mohafzaName = req.body.manteqaName;
  const mohafzaId = req.body.manteqaId;
  const updatedMohafza = await prisma.mohafzatLookup.update({
    where: {
      MohafzaID: mohafzaId,
    },
    data: {
      MohafzaName: mohafzaName,
    },
  });
  res.status(200).json(updatedMohafza);
};

export default updateMohafzat;
