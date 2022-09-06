import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/qorood/getQoroodByCode

const getQoroodOfEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = req.body.code;
  const qorood = await prisma.qorood.findMany({
    where: {
      PersonId: code,
    },
    orderBy: {
      QardRequestDate: "asc",
    },
  });
  res.json(qorood);
};

export default getQoroodOfEmployee;
