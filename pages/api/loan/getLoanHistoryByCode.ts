import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/loan/getLoanHistoryByCode

const getLoanHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  const personCode = req.body.code;
  const filteredYear = req.body.year;
  const LoanHistory = await prisma.personSolfaPerMonth.findMany({
    where: {
      PersonCode: personCode,
      IsApproved: true,
      SolfaYearToBeApplied: filteredYear,
    },
    orderBy: {
      SolfaRequestDate: "desc",
    },
  });
  res.status(200).json(LoanHistory);
};

export default getLoanHistory;
