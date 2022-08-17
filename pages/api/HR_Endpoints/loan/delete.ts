import { NextApiRequest, NextApiResponse } from "next";
import { deleteLoan } from "../../../../controllers/loanController";

// http://localhost:3000/api/HR_Endpoints/loan/delete

const deleteLoanEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const loanId = req.body.id;
    const deletedLoan = await deleteLoan(loanId);
    res.status(200).json(deletedLoan);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default deleteLoanEndpoint;
