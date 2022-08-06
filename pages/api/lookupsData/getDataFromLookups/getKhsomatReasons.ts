import { NextApiRequest, NextApiResponse } from "next";
import { getKhasmReasons } from "../../../../controllers/khasmController";

// http://localhost:3000/api/getDataFromLookups/getKhsomatReasons

const getKhsomatReasons = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reasons = await getKhasmReasons();
    res.status(200).json(reasons);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getKhsomatReasons;
