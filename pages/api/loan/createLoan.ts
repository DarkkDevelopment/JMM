import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// http://localhost:3000/api/loan/createLoan

const createLoan = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    PersonCode,
    SolfaValue,
    SolfaRequestDate,
    SolfaMonthToBeApplied,
    SolfaYearToBeApplied,
  } = req.body;

  const loan = await prisma.personSolfaPerMonth.create({
    data: {
      PersonCode,
      SolfaValue,
      SolfaRequestDate,
      SolfaMonthToBeApplied,
      SolfaYearToBeApplied,
      IsApproved: true,
      IsDoneAndPaid: false,
    },
  });

  if (loan) {
    res.status(200).json({
      status: "success",
      data: {
        loan,
      },
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

export default createLoan;
