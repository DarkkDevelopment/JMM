import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/hafezReasons

const updateReason = async (req: NextApiRequest, res: NextApiResponse) => {
  const reasonDescription = req.body.reasonDescription;
  const reasonID = req.body.reasonID;
  const newReason = await prisma.hafezReasons.update({
    where: {
      ReasonID: reasonID,
    },
    data: {
      ReasonDescription: reasonDescription,
    },
  });
  res.status(200).json(newReason);
};

export default updateReason;
