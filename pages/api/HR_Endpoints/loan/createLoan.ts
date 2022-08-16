import { NextApiRequest, NextApiResponse } from "next";
import { checkIfEmployeeTokeLoanInSameMonthBefore } from "../../../../controllers/loanController";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/loan/createLoan

const createLoan = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    PersonCode,
    SolfaValue,
    SolfaRequestDate,
    SolfaMonthToBeApplied,
    SolfaYearToBeApplied,
  } = req.body;

  const checkFirst = await checkIfEmployeeTokeLoanInSameMonthBefore(
    req,
    res,
    PersonCode,
    new Date(SolfaRequestDate)
  );
  if (checkFirst) {
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
  } else {
    res.status(400).json({
      status: "fail",
      message: "You can't loan in same month",
    });
  }
};

export default createLoan;
