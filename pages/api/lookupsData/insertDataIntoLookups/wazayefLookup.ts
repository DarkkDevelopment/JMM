import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const insertNewWazeefa = async (req: NextApiRequest, res: NextApiResponse) => {
  const newWazeefaName = req.body.wazeefaName;
  const newWazeefaDescription = req.body.wazeefaDescription;

  const newWazeefa = await prisma.wazayefTypesLookup.create({
    data: {
      WazeefaName: newWazeefaName,
      WazeefaDescription: newWazeefaDescription,
    },
  });
  res.status(200).json(newWazeefa);
};

export default insertNewWazeefa;
