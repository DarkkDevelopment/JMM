import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/namesLookup

const deleteNames = async (req: NextApiRequest, res: NextApiResponse) => {
  const nameId = req.body.nameId;
  const deletedNames = await prisma.namesLookup.delete({
    where: {
      NameID: nameId,
    },
  });
  res.status(200).json(deletedNames);
};

export default deleteNames;
