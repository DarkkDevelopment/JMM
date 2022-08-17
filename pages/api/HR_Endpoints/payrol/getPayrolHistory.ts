import { NextApiRequest, NextApiResponse } from "next";
import { checkForDate } from "../../../../controllers/checkForDateController";
import {
  renderNewPayrols,
  renderPastPayrols,
} from "../../../../controllers/payrolController";

// http://localhost:3000/api/payrol/getPayrolHistory

const getPayrolHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { month, year } = req.body;
    const checkDate = checkForDate(month, year);
    if (checkDate) {
      const newPayrols = await renderNewPayrols(req, res);
      setTimeout(() => {
        res.status(200).json({
          status: "success NEW",
          data: newPayrols,
        });
      }, 100);
    } else {
      const OldPayrols = await renderPastPayrols(month, year);
      res.status(200).json({
        status: "success OLD",
        data: OldPayrols,
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getPayrolHistory;
