import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/Inventory_Endpoints/lookups/createItem

const createItem = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.body.name;
    const UnitId = req.body.UnitId;
    const MakhzanId = req.body.MakhzanId;
    const itemInfo = await prisma.itemsLookup.create({
      data: {
        ItemName: name,
      },
    });
    const itemUnit = await prisma.itemsUnits.create({
      data: {
        ItemId: itemInfo.id,
        UnitId: UnitId,
      },
    });
    const itemMakhzan = await prisma.makhzanItems.create({
      data: {
        ItemId: itemInfo.id,
        MakhzanId: MakhzanId,
      },
    });
    res.json({
      message: "Sent Successfully",
    });
  } catch (error) {
    res.json(error);
  }
};

export default createItem;
