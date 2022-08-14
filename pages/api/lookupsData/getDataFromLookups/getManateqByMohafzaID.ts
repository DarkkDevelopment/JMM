import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/getManateqByMohafzaID?mohafzaID=1

const getManateqByMohafzaID = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const mohafzaID = Number(req.query.mohafzaID);
    const getAllManateq = await prisma.manteqaLookup.findMany({
      where: {
        deletedAt: null,
        Manteqa_MohafzaID: mohafzaID,
      },
    });
    res.status(200).json(getAllManateq);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default getManateqByMohafzaID;
