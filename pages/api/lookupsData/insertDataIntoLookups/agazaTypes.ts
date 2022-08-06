import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/agazaTypes

const createAgazaTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const nameOfNewAgaza = req.body.nameOfNewAgaza;
  const newOne = await prisma.agazaTypesLookup.create({
    data: {
      AgazaType: nameOfNewAgaza,
    },
  });
  res.status(200).json(newOne);
};

export default createAgazaTypes;
