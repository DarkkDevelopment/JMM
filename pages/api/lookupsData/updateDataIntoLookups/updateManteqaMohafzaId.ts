import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/updateManteqaMohafzaId

const updateMohafzaId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const manteqaId = req.body.manteqaId;
    const mohafzaId = req.body.mohafzaId;
    const updatedManteqaMohafzaId = await prisma.manteqaLookup.update({
      where: {
        ManteqaID: manteqaId,
      },
      data: {
        Manteqa_MohafzaID: mohafzaId,
      },
    });
    res.status(200).json(updatedManteqaMohafzaId);
  } catch (error) {
    res.status(500).json({ error: "couldn't update it" });
  }
};

export default updateMohafzaId;
