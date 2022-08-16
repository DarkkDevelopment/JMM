import { NextApiRequest, NextApiResponse } from "next";
import {
  checkIfInsuranceExists,
  sendInsuranceForMonth,
} from "../../../../controllers/InsuranceController";
import { sendInsuranceModel } from "../../../../models/insuranceModel";

// http://localhost:3000/api/insurance/send

const sendInsurance = async (req: NextApiRequest, res: NextApiResponse) => {
  const month = req.body.month;
  const year = req.body.year;
  const InsuranceModels: sendInsuranceModel[] = req.body.InsuranceModels;
  const check = await checkIfInsuranceExists(month, year);
  if (!check) {
    const response = await sendInsuranceForMonth(month, year, InsuranceModels);
    res.status(200).json(response);
  } else {
    res.status(200).json({
      message: "Insurance already exists",
    });
  }
};

export default sendInsurance;
