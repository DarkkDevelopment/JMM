import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/ozonat/get

const getOzonatHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  const history = await prisma.qoroodOzoonatHistory.findMany({
    include: {
      Qard: {
        include: {
          Person: {
            select: {
              PersonFirstName: true,
              PersonSecondName: true,
              PersonThirdName: true,
              PersonFourthName: true,
            },
          },
        },
      },
    },
  });
  res.json(history);
};

export default getOzonatHistory;
