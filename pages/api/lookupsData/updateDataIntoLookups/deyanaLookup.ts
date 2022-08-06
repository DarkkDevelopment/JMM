import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/deyanaLookup

const updateDeyana = async (req: NextApiRequest, res: NextApiResponse) => {
  const nameOfNewDeyana = req.body.nameOfNewDeyana;
  const idOfNewDeyana = req.body.idOfNewDeyana;
  const newDeyana = await prisma.dyanaLookup.update({
    where: {
      DyanaID: idOfNewDeyana,
    },
    data: {
      DyanaName: nameOfNewDeyana,
    },
  });
  res.status(200).json(newDeyana);
};

export default updateDeyana;
