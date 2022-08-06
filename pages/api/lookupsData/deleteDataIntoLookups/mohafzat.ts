import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/mohafzat

const deleteMohafazat = async (req: NextApiRequest, res: NextApiResponse) => {
  const mohafzaId = req.body.manteqaId;
  const deletedMohafza = await prisma.mohafzatLookup.delete({
    where: {
      MohafzaID: mohafzaId,
    },
  });
  res.status(200).json(deletedMohafza);
};

export default deleteMohafazat;
