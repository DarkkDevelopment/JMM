import { NextApiRequest, NextApiResponse } from "next";
import { checkIfEmployeeTokeLoanInSameMonthBefore } from "../../../../controllers/loanController";

// http://localhost:3000/api/HR_Endpoints/loan/check

const checkForLastLoansEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = Number(req.body.code);
  const month = Number(req.body.month);
  const year = Number(req.body.year);
  const check = await checkIfEmployeeTokeLoanInSameMonthBefore(
    code,
    month,
    year
  );
  console.log(check);
  if (check) {
    res.status(200).json({
      data: check,
      message: "لا يمكن تقديم سلفة جديدة في نفس الشهر",
    });
  } else {
    res.status(200).json({
      data: check,
      message: "يمكن تقديم سلفة جديدة في نفس الشهر",
    });
  }
};

export default checkForLastLoansEndpoint;
