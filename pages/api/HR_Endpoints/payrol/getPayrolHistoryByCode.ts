import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/payrol/getPayrolHistoryByCode

const getPayrolHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  const personCode = req.body.code;
  const filterMonth = req.body.month;
  const filterYear = req.body.year;

  const PayrolHistory = await prisma.personPayrollHistory.findFirst({
    where: {
      PersonCode: personCode,
      PayrollMonth: filterMonth,
      PayrollYear: filterYear,
    },
    select: {
      PersonMorattabAtThatMonth: true,
      NetSalary: true,
      TotalHafezSummationValue: true,
    },
  });
  res.status(200).json(PayrolHistory);
};

export default getPayrolHistory;
