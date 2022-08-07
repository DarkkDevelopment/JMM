import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/manateq

const getManateq = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const manateq = await prisma.manteqaLookup.findMany({
      where: {
        deletedAt: null,
      },
    });
    res.status(200).json(manateq);
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default getManateq;
