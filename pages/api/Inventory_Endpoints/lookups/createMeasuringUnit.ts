import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/Inventory_Endpoints/lookups/createMeasuringUnit

const createMeasuringUnit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const name = req.body.name;
    const result = await prisma.measuringUnitsLookup.create({
      data: {
        UnitName: name,
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export default createMeasuringUnit;
