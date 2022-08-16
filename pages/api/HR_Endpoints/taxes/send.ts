import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { sendTaxesModel } from "../../../../models/taxesModel";

// http://localhost:3000/api/taxes/send

const sendTaxes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month, year } = req.body;
  const TaxesModels: sendTaxesModel[] = req.body.TaxesModels;
  TaxesModels.forEach(async (TaxesModel) => {
    await prisma.personDarayebHistory.create({
      data: {
        PersonCode: TaxesModel.PersonCode,
        PersonMorattabAtThatMonth: TaxesModel.PersonMorattabAtThatMonth,
        PersonDarayebPercentageAtThatMonth:
          TaxesModel.PersonDarayebPercentageAtThatMonth,
        TotalValueOfDarayeb: TaxesModel.TotalValueOfDarayeb,
        Month: month,
        Year: year,
      },
    });
  });
};

export default sendTaxes;
