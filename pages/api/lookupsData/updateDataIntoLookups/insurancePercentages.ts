import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/insurancePercentages

const updateInsurancePercentages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const insurancePercentageBySherka = req.body.insurancePercentageBySherka;
  const insurancePercentageByPerson = req.body.insurancePercentageByPerson;
  const idOfInsurance = req.body.idOfInsurance;

  const updateInsurancePercentages =
    await prisma.ta2meenatFixedPercentage.update({
      where: {
        id: idOfInsurance,
      },
      data: {
        Ta2meenatPercentagePaidBySherka: insurancePercentageBySherka,
        Ta2meenatPercentagePaidByPerson: insurancePercentageByPerson,
      },
    });
  res.status(200).json(updateInsurancePercentages);
};

export default updateInsurancePercentages;
