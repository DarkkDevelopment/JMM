import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/mohafazat

const getMohafazat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const mohafazat = await prisma.mohafzatLookup.findMany({});
    res.status(200).json(mohafazat);
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default getMohafazat;
