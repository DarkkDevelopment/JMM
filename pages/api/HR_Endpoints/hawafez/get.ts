import { NextApiRequest, NextApiResponse } from "next";
import { calculateTotalHawafezinMonth } from "../../../../controllers/hawafezController";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/hawafez/get

const getHafezHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { month, year } = req.body;
    const hafezHistory = await calculateTotalHawafezinMonth(
      req,
      res,
      month,
      year
    );
    res.status(200).json(hafezHistory);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export default getHafezHistory;
