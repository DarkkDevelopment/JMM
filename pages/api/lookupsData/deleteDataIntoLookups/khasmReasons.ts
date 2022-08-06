import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/khasmReasons

const deleteReasons = async (req: NextApiRequest, res: NextApiResponse) => {
  const reasonID = req.body.reasonID;
  const deletedReason = await prisma.khasmReasons.delete({
    where: {
      ReasonID: reasonID,
    },
  });
  res.status(200).json(deletedReason);
};

export default deleteReasons;
