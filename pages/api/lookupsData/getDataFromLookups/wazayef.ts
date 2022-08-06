import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/wazayef

const getWazayef = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const wazayef = await prisma.wazayefTypesLookup.findMany({});
    res.status(200).json(wazayef);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default getWazayef;
