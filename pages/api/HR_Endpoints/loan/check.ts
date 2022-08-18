import { NextApiRequest, NextApiResponse } from "next";
import { checkIfEmployeeTokeLoanInSameMonthBefore } from "../../../../controllers/loanController";

// http://localhost:3000/api/HR_Endpoints/loan/check

const checkForLastLoansEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const code = req.body.code;
  const date = new Date(req.body.date);
  const monthToBeChecked = date.getMonth() + 1;
  const yearToBeChecked = date.getFullYear();
  const check = await checkIfEmployeeTokeLoanInSameMonthBefore(
    code,
    monthToBeChecked,
    yearToBeChecked
  );
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
