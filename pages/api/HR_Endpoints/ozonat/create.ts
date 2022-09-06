import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/ozonat/create

const createNewEzn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const QardId = req.body.QardId;
    const EznValue = req.body.EznValue;

    if (QardId && EznValue) {
      const newEzn = await prisma.qoroodOzoonatHistory.create({
        data: {
          QardId: QardId,
          EznValue: EznValue,
          EznDate: new Date(),
        },
      });
      res.json(newEzn);
    } else {
      res.json({ message: "PersonCode and EznValue are required" });
    }
  } catch (error) {
    res.json(error);
  }
};

export default createNewEzn;
