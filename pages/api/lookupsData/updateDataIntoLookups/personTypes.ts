import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/personTypes

const updatePersonTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const personType = req.body.personType;
  const personTypeId = req.body.personTypeId;
  const updatedType = await prisma.personTypesLookup.update({
    where: {
      PersonTypeID: personTypeId,
    },
    data: {
      PersonType: personType,
    },
  });
  res.status(200).json(updatedType);
};

export default updatePersonTypes;
