import { NextApiRequest, NextApiResponse } from "next";
import { checkIfEmployeeTokeLoanInSameMonthBefore } from "../../../../controllers/loanController";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/loan/createLoan

const createLoan = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    PersonCode,
    SolfaValue,
    SolfaRequestDate,
    SolfaMonthToBeApplied,
    SolfaYearToBeApplied,
  } = req.body;

  const checkFirstBeforeCreate = await checkIfEmployeeTokeLoanInSameMonthBefore(
    PersonCode,
    SolfaMonthToBeApplied,
    SolfaYearToBeApplied
  );
  if (!checkFirstBeforeCreate) {
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
      message: "لا يمكن تقديم سلفة جديدة في نفس الشهر",
    });
  }
};

export default createLoan;
