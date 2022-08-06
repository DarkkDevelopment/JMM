import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/deyanaLookup

const createNewDeyana = async (req: NextApiRequest, res: NextApiResponse) => {
  const nameOfNewDeyana = req.body.nameOfNewDeyana;
  const newDeyana = await prisma.dyanaLookup.create({
    data: {
      DyanaName: nameOfNewDeyana,
    },
  });
  res.status(200).json(newDeyana);
};

export default createNewDeyana;
