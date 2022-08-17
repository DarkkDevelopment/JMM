import { NextApiRequest, NextApiResponse } from "next";
import { calculateTotalKhsomatinMonth } from "../../../../controllers/khasmController";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/khasm/get

const getKhasm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { month, year } = req.body;
    const KhasmHistory = await calculateTotalKhsomatinMonth(year);
    res.status(200).json(KhasmHistory);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export default getKhasm;
