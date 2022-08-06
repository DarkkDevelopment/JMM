import { NextApiRequest, NextApiResponse } from "next";
import { checkForVacation } from "../../../controllers/VacationsController";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/vacations/createNewVacation

const createNewVacation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { PersonCode, AgazaDate, AgazaTypeId } = req.body;
  if (!(await checkForVacation(PersonCode, AgazaDate))) {
    const newVacation = await prisma.personAgazaRequestAndHistoryTable.create({
      data: {
        PersonCode,
        AgazaDate,
        AgazaTypeId,
      },
    });
    res.status(200).json({
      newVacation,
      message: "Vacation is registered before",
    });
  } else {
    res.status(200).json({
      message: "Vacation is official data or is registered before",
    });
  }
};

export default createNewVacation;
