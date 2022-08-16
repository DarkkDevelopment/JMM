import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/vacations/deleteVacation

const deleteVacation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const vacation = await prisma.personAgazaRequestAndHistoryTable.delete({
    where: {
      id,
    },
  });
  res.status(200).json(vacation);
};

export default deleteVacation;
