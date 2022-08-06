import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/globalValues

const deleteGlobalValues = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.body.id;
  const deletedValue = await prisma.fixedGlobalValues.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(deletedValue);
};

export default deleteGlobalValues;
