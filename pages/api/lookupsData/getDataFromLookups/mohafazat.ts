import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/getDataFromLookups/mohafazat

const getMohafazat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mohafazat = await prisma.mohafzatLookup.findMany({
      where: {
        deletedAt: null,
      },
    });
    res.status(200).json(mohafazat);
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default getMohafazat;
