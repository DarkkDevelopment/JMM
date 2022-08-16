import { NextApiRequest, NextApiResponse } from "next";
import { checkForDate } from "../../../../controllers/checkForDateController";
import {
  checkIfInsuranceExists,
  getInsurancePercentageRatio,
  renderNewInsurance,
  renderPastInsurance,
} from "../../../../controllers/InsuranceController";

//import { checkForDate } from '../../../controllers/checkForDateController';
// http://localhost:3000/api/insurance/getAll

// this is for the insurance table in Insurance page

const getAllEmployees = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month, year } = req.body;
  const checkDate = checkForDate(month, year);
  const checkForOldInsurance = await checkIfInsuranceExists(month, year);
  if ((await checkDate) && !checkForOldInsurance) {
    const percentage = await getInsurancePercentageRatio();
    const newRecords = await renderNewInsurance(
      req,
      res,
      percentage.percentageRatioOfSherka
    );
    res.status(200).json({
      status: "success NEW",
      data: newRecords,
    });
  } else {
    const OldRecords = await renderPastInsurance(req, res, month, year);
    setTimeout(() => {
      res.status(200).json({
        status: "success OLD",
        data: OldRecords,
      });
    }, 1000);
  }
};

export default getAllEmployees;
