import { NextApiRequest, NextApiResponse } from "next";
import { checkForDate } from "../../../controllers/checkForDateController";
import {
  renderNewPayrols,
  renderPastPayrols,
} from "../../../controllers/payrolController";

// http://localhost:3000/api/payrol/getPayrolHistory

const getPayrolHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { month, year } = req.body;
    const checkDate = checkForDate(month, year);
    if (await checkDate) {
      const newPayrols = await renderNewPayrols(req, res);
      setTimeout(() => {
        res.status(200).json({
          status: "success NEW",
          data: newPayrols,
        });
      }, 2000);
    } else {
      // todo : should here render the old payrols
      const OldPayrols = await renderPastPayrols(req, res, month, year);
      setTimeout(() => {
        res.status(200).json({
          status: "success OLD",
          data: OldPayrols,
        });
      }, 1000);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getPayrolHistory;
