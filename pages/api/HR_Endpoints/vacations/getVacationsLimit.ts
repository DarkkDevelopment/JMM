import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/vacations/getVacationsLimit

const getVacationsLimit = async (req: NextApiRequest, res: NextApiResponse) => {
  const { PersonCode, year } = req.body;
  const limit = await prisma.personAgazaLimit.findUnique({
    where: {
      PersonCode_Year: {
        PersonCode,
        Year: year,
      },
    },
    select: {
      NumberOfAgazaDays: true,
    },
  });
  res.status(200).json(limit);
};

export default getVacationsLimit;
