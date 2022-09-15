import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/Inventory_Endpoints/reports/getItemsUnits

const getItemsUnits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await prisma.itemsUnits.findMany({
      include: {
        Item: {
          select: {
            ItemName: true,
          },
        },
        Unit: {
          select: {
            UnitName: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export default getItemsUnits;
