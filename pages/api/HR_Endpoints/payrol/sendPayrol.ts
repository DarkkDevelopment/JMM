import { NextApiRequest, NextApiResponse } from "next";
import { sendInsuranceForMonth } from "../../../../controllers/InsuranceController";
import { sendTaxesForMonth } from "../../../../controllers/taxesController";
import prisma from "../../../../lib/prisma";
import { sendInsuranceModel } from "../../../../models/insuranceModel";
import { PayrolModel } from "../../../../models/payrolModel";
import { sendTaxesModel } from "../../../../models/taxesModel";

// button for closing the payrol should fire this request to create new record in table payrol history

// http://localhost:3000/api/payrol/sendPayrol

const sendPayrol = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payrol: PayrolModel[] = req.body.payrol;
    const Insurance: sendInsuranceModel[] = req.body.Insurance;
    const Taxes: sendTaxesModel[] = req.body.Taxes;
    const month = req.body.month;
    const year = req.body.year;
    await sendInsuranceForMonth(month, year, Insurance);
    await sendTaxesForMonth(month, year, Taxes);
    payrol.forEach(async (payrol) => {
      await prisma.personPayrollHistory.create({
        data: {
          PersonCode: payrol.PersonCode,
          PersonMorattabAtThatMonth: payrol.PersonMorattabAtThatMonth,
          Total3adadSa3atElTa25eerAtThatMonth:
            payrol.Total3adadSa3atElTa25eerAtThatMonth,
          ValueOfKhasmForTotal3adadSa3atElTa25eerAtThatMonth:
            payrol.ValueOfKhasmFor3adadSa3atElTa25eerAtThatMonth,
          Total3adadAyyamEl5asmAwElGhyabAtThatMonth:
            payrol.Total3adadAyamEl5asmAwElGheyabaAtThatMonth,
          ValueOfKhasmForTotal3adadAyyamEl5asmAwElGhyabAtThatMonth:
            payrol.ValueOfKhasmForTotal3adadAyamEl5asmAwElGheyabaAtThatMonth,
          TotalValueOfIndividualKhasmAtThatMonth:
            payrol.TotalValueOfIndividualKhasmAtThatMonth,
          TotalKhasmSummationValue: payrol.TotalKhasmSummationValue,
          Total3adadSa3atElExtraAtThatMonth:
            payrol.Total3adadSa3atElExtraAtThatMonth,
          ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth:
            payrol.ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth,
          Total3adadAyyamElEdafyAwElHafezAtThatMonth:
            payrol.Total3adadAyamElEdafyAwElHafezAtThatMonth,
          ValueOfHafezForTotalTotal3adadAyyamElEdafyAwElHafezAtThatMonth:
            payrol.ValueOfHafezForTotal3adadAyamElEdafyAwElHafezAtThatMonth,
          TotalValueOfIndividualHafezAtThatMonth:
            payrol.TotalValueOfIndividualHafezAtThatMonth,
          TotalHafezSummationValue: payrol.TotalHafezSummationValue,
          TotalValueOfSolafTakenAtThatMonth:
            payrol.TotalValueOfSolafTakenAtThatMonth,
          DarayebPercentageForThatMorattabAtThatMonth:
            payrol.DrayebPercentageForMorattabAtThatMonth,
          TotalValueOfDarayebAtThatMonth: payrol.TotalValueOfDarayebAtThatMonth,
          PersonTa2meenValue: payrol.PersonTa2meenValue,
          PersonTa2meenPercentage: payrol.PersonTa2meenPercentage,
          TotalValueOfTa2meenatAtThatMonth:
            payrol.TotalValueOfTa2meenAtThatMonth,
          NetSalary: payrol.NetSalary,
          PersonPayrollDate: payrol.PersonPayrollDate,
          PayrollMonth: payrol.PayrolMonth,
          PayrollYear: payrol.PayrolYear,
        },
      });
    });
    res.status(200).json({
      message: "Payrol sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending payrol",
    });
  }
};

export default sendPayrol;
