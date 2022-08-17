import { NextApiRequest, NextApiResponse } from "next";
import { renderLoanHistoryByYear } from "../../../../controllers/loanController";
import { SolfaModel } from "../../../../models/SolfaModel";

// http://localhost:3000/api/loan/getLoanHistory

const getLoanHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const year = req.body.year;
    const historyOfLoans: SolfaModel[] = await renderLoanHistoryByYear(
      req,
      res,
      year
    );
    setTimeout(() => {
      res.status(200).json(historyOfLoans);
    }, 100);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getLoanHistory;
