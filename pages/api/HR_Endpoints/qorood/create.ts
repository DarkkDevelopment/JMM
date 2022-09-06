import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/qorood/create

const creatNewQard = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const PersonCode = req.body.PersonCode;
    const QardValue = req.body.QardValue;

    if (PersonCode && QardValue) {
      const newQard = await prisma.qorood.create({
        data: {
          PersonId: PersonCode,
          TotalQardValue: QardValue,
          QardRequestDate: new Date(),
        },
      });
      res.json(newQard);
    } else {
      res.json({ message: "PersonCode and QardValue are required" });
    }
  } catch (error) {
    res.json(error);
  }
};

export default creatNewQard;
