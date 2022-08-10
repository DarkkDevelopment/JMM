import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/globalValues

const updateGlobalValues = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const newValue = req.body.newValue;
  const updatedValue = await prisma.fixedGlobalValues.update({
    where: {
      id: 1,
    },
    data: {
      Name: "LoanPercentage",
      Value: newValue,
    },
  });
  res.status(200).json(updatedValue);
};

export default updateGlobalValues;
