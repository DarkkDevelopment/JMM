import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/personDeyana

const getPersonDeyana = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const personDeyana = await prisma.dyanaLookup.findMany({});
    res.status(200).json(personDeyana);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default getPersonDeyana;
