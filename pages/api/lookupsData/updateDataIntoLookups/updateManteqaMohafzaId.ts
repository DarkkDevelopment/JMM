import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/updateManteqaMohafzaId

// todo it will work if two data are sent will update the two if one of them is also fine will update the one which was sent

const updateMohafzaId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const manteqaId = req.body.manteqaId;
    const mohafzaId = req.body.mohafzaId;
    const manteqaNewName = req.body.manteqaNewName;
    if (manteqaNewName && mohafzaId) {
      const updatedManteqaMohafzaId = await prisma.manteqaLookup.update({
        where: {
          ManteqaID: manteqaId,
        },
        data: {
          Manteqa_MohafzaID: mohafzaId,
          ManteqaName: manteqaNewName,
        },
      });
      res.status(200).json(updatedManteqaMohafzaId);
    } else if (manteqaNewName && !mohafzaId) {
      const updatedManteqaMohafzaId = await prisma.manteqaLookup.update({
        where: {
          ManteqaID: manteqaId,
        },
        data: {
          ManteqaName: manteqaNewName,
        },
      });
      res.status(200).json(updatedManteqaMohafzaId);
    } else {
      const updatedManteqaMohafzaId = await prisma.manteqaLookup.update({
        where: {
          ManteqaID: manteqaId,
        },
        data: {
          Manteqa_MohafzaID: mohafzaId,
        },
      });
      res.status(200).json(updatedManteqaMohafzaId);
    }
  } catch (error) {
    res.status(500).json({ error: "couldn't update it" });
  }
};

export default updateMohafzaId;
