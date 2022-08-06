import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleDataIntoLookups/personTypes

const deletePersonTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const personTypeId = req.body.personTypeId;
  const deletedType = await prisma.personTypesLookup.delete({
    where: {
      PersonTypeID: personTypeId,
    },
  });
  res.status(200).json(deletedType);
};

export default deletePersonTypes;
