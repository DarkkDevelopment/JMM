import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/agazaTypes

const deleteAgazaTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id;
  const deletedAgazaType = await prisma.agazaTypesLookup.delete({
    where: {
      AgazaTypeID: id,
    },
  });
  res.status(200).json(deletedAgazaType);
};

export default deleteAgazaTypes;
