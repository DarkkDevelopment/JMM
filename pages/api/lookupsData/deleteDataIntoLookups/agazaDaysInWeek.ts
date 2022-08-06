import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/agazaDaysInWeek

const deleteAgazaDaysInWeek = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const agazaDayId = req.body.agazaDayId;
  const deletedAgazaDaysInWeek = await prisma.agazaDaysInWeek.delete({
    where: {
      id: agazaDayId,
    },
  });
  res.status(200).json(deletedAgazaDaysInWeek);
};

export default deleteAgazaDaysInWeek;
