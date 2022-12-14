import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { sendAbsenceModel } from "../../../../models/GheyabModels";

// http://localhost:3000/api/HR_Endpoints/absence/create

const sendAbsence = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const AbsenceModels: sendAbsenceModel[] = req.body;
    AbsenceModels.map(async (element) => {
      const createGheyab = await prisma.gheyabHistory.create({
        data: {
          PersonGheyabCode: element.PersonGheyabCode,
          GheyabDate: element.GheyabDate,
        },
      });
    });
    res.status(200).json({
      message: "Gheyab sent successfully",
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export default sendAbsence;
