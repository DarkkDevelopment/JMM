import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/globalValues

const insertNewValue = async (req: NextApiRequest, res: NextApiResponse) => {
  const nameOfNewValue = req.body.nameOfNewValue;
  const newValue = req.body.newValue;
  const CreateNewValue = await prisma.fixedGlobalValues.create({
    data: {
      Name: nameOfNewValue,
      Value: newValue,
    },
  });
  res.status(200).json(CreateNewValue);
};

export default insertNewValue;
