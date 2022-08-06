import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/hafezKhasmRatios

const deleteHafezAndKhasmRatios = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.body.id;
  const deletedRatio = await prisma.fixedHafezAndKhasmRatios.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(deletedRatio);
};

export default deleteHafezAndKhasmRatios;
