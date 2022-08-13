import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/manteqa

// todo : here you should remember that we send mohafza Id with inserting new manteqa to make manateq related to mohafzat

const createNewManteqaEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const mohafzaId = req.body.mohafzaId;
  const manteqaName = req.body.manteqaName;

  const inertNewManteqa = await prisma.manteqaLookup.create({
    data: {
      Manteqa_MohafzaID: mohafzaId,
      ManteqaName: manteqaName,
    },
  });
  res.status(200).json(inertNewManteqa);
};

export default createNewManteqaEndpoint;
