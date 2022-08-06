import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/khasmReasons

const updateReasons = async (req: NextApiRequest, res: NextApiResponse) => {
  const reasonDescription = req.body.reasonDescription;
  const reasonID = req.body.reasonID;
  const updateReason = await prisma.khasmReasons.update({
    where: {
      ReasonID: reasonID,
    },
    data: {
      ReasonDescription: reasonDescription,
    },
  });
  res.status(200).json(updateReason);
};

export default updateReasons;
