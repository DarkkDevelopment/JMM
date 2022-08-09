import { NextApiRequest, NextApiResponse } from "next";
import getLoanPercentage from "../../../../controllers/getLoanPercentage";
// for now this will return the loan percentage

// http://localhost:3000/api/lookupsData/getDataFromLookups/globalValues

const getLoanPercentageEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const loanPercentage = await getLoanPercentage(req, res);
    res.status(200).json(loanPercentage);
  } catch (error: Error | any) {
    res.status(500).json({ error: error.message });
  }
};

export default getLoanPercentageEndpoint;
