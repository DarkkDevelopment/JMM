import { NextApiRequest, NextApiResponse } from "next";
import { getQoroodHistory } from "../../../../controllers/qoroodController";

// http://localhost:3000/api/HR_Endpoints/qorood/get

const GetQorood = async (req: NextApiRequest, res: NextApiResponse) => {
  const history = await getQoroodHistory();
  res.json(history);
};

export default GetQorood;
