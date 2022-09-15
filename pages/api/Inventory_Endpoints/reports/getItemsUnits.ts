import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { ItemsUnitsModel } from "../../../../models/ItemsUnitsModel";

// http://localhost:3000/api/Inventory_Endpoints/reports/getItemsUnits

// this one to get the measuring units of certain item

const getItemsUnits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const itemId = req.body.itemId;
    let ItemsModel: ItemsUnitsModel = {
      ItemId: 0,
      ItemName: "",
      Units: [],
    };
    const result = await prisma.itemsUnits.findMany({
      where: {
        ItemId: itemId,
      },
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
    ItemsModel.ItemId = result[0].ItemId;
    ItemsModel.ItemName = result[0].Item.ItemName;
    result.forEach((item) => {
      ItemsModel.Units.push({
        UnitId: item.UnitId,
        UnitName: item.Unit.UnitName,
      });
    });
    res.json(ItemsModel);
  } catch (error) {
    res.json(error);
  }
};

export default getItemsUnits;
