import { NextApiRequest, NextApiResponse } from "next";
import renderLoanHistoryByDate from "../../../controllers/loanController";
import { SolfaModel } from "../../../models/SolfaModel";

// http://localhost:3000/api/loan/getLoanHistory

const getLoanHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const historyOfLoans: SolfaModel[] = await renderLoanHistoryByDate(
      req,
      res
    );
    setTimeout(() => {
      res.status(200).json(historyOfLoans);
    }, 1000);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getLoanHistory;
