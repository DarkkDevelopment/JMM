import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/manteqa

const updateManteqa = async (req: NextApiRequest, res: NextApiResponse) => {
  const manteqaName = req.body.manteqaName;
  const manteqaId = req.body.manteqaId;
  const updateManteqa = await prisma.manteqaLookup.update({
    where: {
      ManteqaID: manteqaId,
    },
    data: {
      ManteqaName: manteqaName,
    },
  });
  res.status(200).json(updateManteqa);
};

export default updateManteqa;
