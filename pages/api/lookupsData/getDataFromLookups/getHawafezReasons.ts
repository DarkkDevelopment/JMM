import { NextApiRequest, NextApiResponse } from "next";
import { getHawafezResons } from "../../../../controllers/hawafezController";

// http://localhost:3000/api/getDataFromLookups/getHawafezReasons

const getHawafezReasonsEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const reasons = await getHawafezResons();
    res.status(200).json(reasons);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getHawafezReasonsEndpoint;
