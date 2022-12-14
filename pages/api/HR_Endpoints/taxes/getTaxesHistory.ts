import { NextApiRequest, NextApiResponse } from "next";
import { checkForDate } from "../../../../controllers/checkForDateController";
import {
  renderNewRecords,
  renderPastRecords,
} from "../../../../controllers/taxesController";

// http://localhost:3000/api/taxes/getTaxesHistory

const getTaxesHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, month } = req.body;
  const checkDate = checkForDate(month, year);
  if (await checkDate) {
    const newRecords = await renderNewRecords(req, res);
    res.status(200).json({
      status: "success NEW",
      data: newRecords,
    });
  } else {
    const OldRecords = await renderPastRecords(req, res, month, year);
    res.status(200).json({
      status: "success OLD",
      data: OldRecords,
    });
  }
};

export default getTaxesHistory;
