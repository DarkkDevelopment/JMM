import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/personTypes

const insertPersonTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const personType = req.body.personType;
  const newPersonType = await prisma.personTypesLookup.create({
    data: {
      PersonType: personType,
    },
  });
  res.status(200).json(newPersonType);
};

export default insertPersonTypes;
