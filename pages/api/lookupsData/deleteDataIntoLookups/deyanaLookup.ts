import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/deyanaLookup

const deleteDeyana = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id;
  const deletedDeyana = await prisma.dyanaLookup.delete({
    where: {
      DyanaID: id,
    },
  });
  res.status(200).json(deletedDeyana);
};

export default deleteDeyana;
