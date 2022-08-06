import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/agazaTypes

const updateAgazaTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  const nameOfNewAgaza = req.body.nameOfNewAgaza;
  const idOfNewAgaza = req.body.idOfNewAgaza;
  const newOne = await prisma.agazaTypesLookup.update({
    where: {
      AgazaTypeID: idOfNewAgaza,
    },
    data: {
      AgazaType: nameOfNewAgaza,
    },
  });
  res.status(200).json(newOne);
};

export default updateAgazaTypes;
