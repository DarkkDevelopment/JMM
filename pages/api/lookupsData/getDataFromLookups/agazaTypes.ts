import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/agazaTypes

const getAgazaTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const agazaTypes = await prisma.agazaTypesLookup.findMany({
      where: {
        deletedAt: null,
      },
    });
    res.status(200).json(agazaTypes);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default getAgazaTypes;
