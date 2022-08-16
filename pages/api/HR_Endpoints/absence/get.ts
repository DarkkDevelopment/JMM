import { NextApiRequest, NextApiResponse } from "next";
import getGheyabDayRatio from "../../../../controllers/getGheyabDayRatio";
import prisma from "../../../../lib/prisma";
import { GetAbsenceModel } from "../../../../models/GheyabModels";

// todo : need to get also GheyabDayRatio to be put in the table

const getAbsenceHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const GheyabDayRatioValue = await getGheyabDayRatio();
    const GhyeabGetModels: GetAbsenceModel[] = [];
    const date = req.body.date;
    const absenceHistory = await prisma.gheyabHistory.findMany({
      where: {
        GheyabDate: date,
      },
      include: {
        Person: {
          select: {
            PersonCode: true,
            PersonFirstName: true,
            PersonSecondName: true,
            PersonThirdName: true,
            PersonFourthName: true,
          },
        },
      },
    });
    absenceHistory.forEach((element) => {
      GhyeabGetModels.push({
        PersonCode: element.Person.PersonCode,
        PersonName: {
          PersonFirstName: element.Person.PersonFirstName,
          PersonSecondName: element.Person.PersonSecondName,
          PersonThirdName: element.Person.PersonThirdName,
          PersonFourthName: element.Person.PersonFourthName,
        },
        GheyabDayRatio: GheyabDayRatioValue?.FixedKhasmDayRatio,
        Date: element.GheyabDate,
      });
    });
    res.status(200).json(GhyeabGetModels);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getAbsenceHistory;
