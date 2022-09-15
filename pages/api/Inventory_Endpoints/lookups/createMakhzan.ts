import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/Inventory_Endpoints/lookups/createMakhzan

const createMakhzan = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const result = await prisma.makhazenLookup.create({
      data: {
        MakhzanName: name,
        MakhzanDescription: description,
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export default createMakhzan;
