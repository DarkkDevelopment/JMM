import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/namesLookup

const updateNames = async (req: NextApiRequest, res: NextApiResponse) => {
  const newName = req.body.newName;
  const nameId = req.body.nameId;
  const updatedName = await prisma.namesLookup.update({
    where: {
      NameID: nameId,
    },
    data: {
      Name: newName,
    },
  });
  res.status(200).json(updatedName);
};

export default updateNames;
