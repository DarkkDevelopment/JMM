import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/manteqa

const createNewManteqaEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const manteqaName = req.body.manteqaName;
  const inertNewManteqa = await prisma.manteqaLookup.create({
    data: {
      ManteqaName: manteqaName,
    },
  });
  res.status(200).json(inertNewManteqa);
};

export default createNewManteqaEndpoint;
