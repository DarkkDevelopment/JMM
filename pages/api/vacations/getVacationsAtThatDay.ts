import { NextApiRequest, NextApiResponse } from "next";
import { getVacationsAtThatDay } from "../../../controllers/VacationsController";

// http://localhost:3000/api/vacations/getVacationsAtThatDay

const getVacationsByDate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const date = req.body.date;
    const getVacations = await getVacationsAtThatDay(req, res, date);
    res.status(200).json(getVacations);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default getVacationsByDate;
