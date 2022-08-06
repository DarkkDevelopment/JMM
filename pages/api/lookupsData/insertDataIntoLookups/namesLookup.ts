import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/namesLookup

const insertNewNames = async (req: NextApiRequest, res: NextApiResponse) => {
  const newName = req.body.newName;
  const insertNewName = await prisma.namesLookup.create({
    data: {
      Name: newName,
    },
  });
  res.status(200).json(insertNewName);
};

export default insertNewNames;
