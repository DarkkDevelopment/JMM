import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/insurancePercentages

const deleteInsurancePercentage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.body.id;
  const deletedPercentages = await prisma.ta2meenatFixedPercentage.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(deletedPercentages);
};

export default deleteInsurancePercentage;
