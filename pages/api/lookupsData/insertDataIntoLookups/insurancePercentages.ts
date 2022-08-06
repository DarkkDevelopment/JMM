import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/insertDataIntoLookups/insurancePercentages

const insertNewInsurancePercentages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const insurancePercentageBySherka = req.body.insurancePercentageBySherka;
  const insurancePercentageByPerson = req.body.insurancePercentageByPerson;

  const newInsurancePercentages = await prisma.ta2meenatFixedPercentage.create({
    data: {
      Ta2meenatPercentagePaidBySherka: insurancePercentageBySherka,
      Ta2meenatPercentagePaidByPerson: insurancePercentageByPerson,
    },
  });
  res.status(200).json(newInsurancePercentages);
};

export default insertNewInsurancePercentages;
