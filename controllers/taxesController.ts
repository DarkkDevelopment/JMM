import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { sendTaxesModel, TaxesModel } from "../models/taxesModel";

const getMorattabAndDarebaPercentage = async (code: number) => {
  const morattabAndPercentage =
    await prisma.personCurrentMorattabAndDarayebPercentage.findUnique({
      where: {
        PersonCode: code,
      },
      select: {
        CurrentMorattab: true,
        PersonMorattabDareebaPercentage: true,
      },
    });
  return {
    morattab: morattabAndPercentage!.CurrentMorattab,
    dareebaPercentage: morattabAndPercentage!.PersonMorattabDareebaPercentage,
  };
};

const renderNewRecords = async (req: NextApiRequest, res: NextApiResponse) => {
  const newRecords: TaxesModel[] = [];
  const getEmpkoyeesInfo = await prisma.person.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      PersonCode: true,
      PersonFirstName: true,
      PersonSecondName: true,
      PersonThirdName: true,
      PersonFourthName: true,
      PersonRaqamQawmy: true,
      PersonRaqamTa2meeny: true,
    },
    orderBy: {
      PersonCode: "asc",
    },
  });
  getEmpkoyeesInfo.forEach(async (employee) => {
    const morattabAndPercentage = await getMorattabAndDarebaPercentage(
      employee.PersonCode
    );
    newRecords.push({
      PersonCode: employee.PersonCode,
      PersonName: {
        PersonFirstName: employee.PersonFirstName,
        PersonSecondName: employee.PersonSecondName,
        PersonThirdName: employee.PersonThirdName,
        PersonFourthName: employee.PersonFourthName,
      },
      PersonNationalId: employee.PersonRaqamQawmy,
      PersonInsuranceId: employee.PersonRaqamTa2meeny,
      PersonMorattab: morattabAndPercentage.morattab,
      TaxesPercentage: morattabAndPercentage.dareebaPercentage,
      TaxesValue:
        (morattabAndPercentage.morattab *
          morattabAndPercentage.dareebaPercentage) /
        100,
    });
  });
  return newRecords;
};

const renderPastRecords = async (
  req: NextApiRequest,
  res: NextApiResponse,
  month: number,
  year: number
) => {
  const OldRecords: TaxesModel[] = [];
  const getEmployeesInfo = await prisma.person.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      PersonCode: true,
      PersonFirstName: true,
      PersonSecondName: true,
      PersonThirdName: true,
      PersonFourthName: true,
      PersonRaqamQawmy: true,
      PersonRaqamTa2meeny: true,
    },
    orderBy: {
      PersonCode: "asc",
    },
  });
  getEmployeesInfo.forEach(async (employee) => {
    const getTaxesInfo = await prisma.personDarayebHistory.findFirst({
      where: {
        PersonCode: employee.PersonCode,
        Year: year,
        Month: month,
      },
      select: {
        PersonMorattabAtThatMonth: true,
        PersonDarayebPercentageAtThatMonth: true,
        TotalValueOfDarayeb: true,
      },
    });
    OldRecords.push({
      PersonCode: employee.PersonCode,
      PersonName: {
        PersonFirstName: employee.PersonFirstName,
        PersonSecondName: employee.PersonSecondName,
        PersonThirdName: employee.PersonThirdName,
        PersonFourthName: employee.PersonFourthName,
      },
      PersonNationalId: employee.PersonRaqamQawmy,
      PersonInsuranceId: employee.PersonRaqamTa2meeny,
      PersonMorattab: getTaxesInfo!.PersonMorattabAtThatMonth,
      TaxesPercentage: getTaxesInfo!.PersonDarayebPercentageAtThatMonth,
      TaxesValue: getTaxesInfo!.TotalValueOfDarayeb,
    });
  });
  return OldRecords;
};

const checkIfTaxesExists = async (month: number, year: number) => {
  const checkOldTaxesHistory = await prisma.personDarayebHistory.findMany({
    where: {
      Year: year,
      Month: month,
    },
  });
  if (checkOldTaxesHistory.length > 0) {
    return true;
  } else {
    return false;
  }
};

const sendTaxesForMonth = async (
  month: number,
  year: number,
  TaxesModels: sendTaxesModel[]
) => {
  if ((await checkIfTaxesExists(month, year)) === false) {
    TaxesModels.forEach(async (taxesModel) => {
      await prisma.personDarayebHistory.create({
        data: {
          PersonCode: taxesModel.PersonCode,
          PersonMorattabAtThatMonth: taxesModel.PersonMorattabAtThatMonth,
          PersonDarayebPercentageAtThatMonth:
            taxesModel.PersonDarayebPercentageAtThatMonth,
          TotalValueOfDarayeb: taxesModel.TotalValueOfDarayeb,
          Year: year,
          Month: month,
        },
      });
    });
  } else {
    console.log("Taxes already exists");
  }
};

export {
  renderNewRecords,
  renderPastRecords,
  getMorattabAndDarebaPercentage,
  sendTaxesForMonth,
  checkIfTaxesExists,
};
