import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/globalValues

const updateGlobalValues = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const nameOfNewValue = req.body.nameOfNewValue;
  const newValue = req.body.newValue;
  const idOfValue = req.body.idOfValue;
  const updatedValue = await prisma.fixedGlobalValues.update({
    where: {
      id: idOfValue,
    },
    data: {
      Name: nameOfNewValue,
      Value: newValue,
    },
  });
  res.status(200).json(updatedValue);
};

export default updateGlobalValues;
