import { NextApiRequest, NextApiResponse } from "next";
import { getRemainingOfQard } from "../../../../controllers/qoroodController";

const getRemainingValue = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id;
  const remaining = await getRemainingOfQard(id);
  res.json(remaining);
};

export default getRemainingValue;
