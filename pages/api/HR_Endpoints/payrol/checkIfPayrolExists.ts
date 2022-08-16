import { NextApiRequest, NextApiResponse } from "next";
import { checkIfPayrolExists } from "../../../../controllers/payrolController";

// http://localhost:3000/api/payrol/checkIfPayrolExists

const checkIfPayrolExistsForThatDate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const dateToCheck = req.body.date;
  const checkIfPayrol = await checkIfPayrolExists(dateToCheck);
  if (checkIfPayrol) {
    res.status(200).json(checkIfPayrol);
  } else {
    res.status(200).json(checkIfPayrol);
  }
};

export default checkIfPayrolExistsForThatDate;
