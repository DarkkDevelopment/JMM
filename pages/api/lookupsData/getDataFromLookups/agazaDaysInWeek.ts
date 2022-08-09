import { NextApiRequest, NextApiResponse } from "next";
import { getVacationsInWeek } from "../../../../controllers/VacationsController";

// http://localhost:3000/api/lookupsData/getDataFromLookups/agazaDaysInWeek

const getAgazaDaysInWeek = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const agazaDays = await getVacationsInWeek();
    res.status(200).json(agazaDays);
  } catch (error: Error | any) {
    res.status(500).json({ error: error.message });
  }
};

export default getAgazaDaysInWeek;
