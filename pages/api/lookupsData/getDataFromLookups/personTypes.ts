import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/getDataFromLookups/personTypes

const getPersonTypes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const personTypes = await prisma.personTypesLookup.findMany({
      where: {
        deletedAt: null,
      },
    });
    res.status(200).json(personTypes);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default getPersonTypes;
