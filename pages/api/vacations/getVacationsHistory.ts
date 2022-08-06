import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/vacations/getVacationsHistory

const getVacationsHistory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { PersonCode } = req.body;
  const history = await prisma.personAgazaRequestAndHistoryTable.findMany({
    where: {
      PersonCode,
      deletedAt: null,
    },
    select: {
      id: true,
      AgazaType: true,
      AgazaDate: true,
    },
    orderBy: {
      AgazaDate: "asc",
    },
  });

  const countVacations = await prisma.personAgazaRequestAndHistoryTable.count({
    where: {
      PersonCode,
      deletedAt: null,
    },
  });

  if (history.length > 0) {
    res.status(200).json({
      status: "success",
      data: {
        history,
        countVacations,
      },
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        history: [],
        countVacations: 0,
      },
    });
  }
};

export default getVacationsHistory;
