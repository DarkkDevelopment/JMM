import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { InsuranceModel, sendInsuranceModel } from "../models/insuranceModel";

const getInsurancePercentageRatio = async () => {
  const percentage = await prisma.ta2meenatFixedPercentage.findFirst({});
  if (percentage) {
    const percentageRatioOfSherka = percentage!.Ta2meenatPercentagePaidBySherka;
    const percentageRatioOfPerson = percentage!.Ta2meenatPercentagePaidByPerson;
    return { percentageRatioOfSherka, percentageRatioOfPerson };
  } else {
    return { percentageRatioOfSherka: 0, percentageRatioOfPerson: 0 };
  }
};
const calculateFinalInsuranceValue = (
  InsurancePercentage: number,
  InsuranceValue: number
) => {
  return InsurancePercentage * InsuranceValue;
};

const renderNewInsurance = async (
  req: NextApiRequest,
  res: NextApiResponse,
  percentage: number
) => {
  const NewRecords: InsuranceModel[] = [];
  const newDate = new Date();
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
      PersonTaree5Ta3yeen: true,
      PersonSanawatTa2meen: true,
      PersonTa2meenValue: true,
    },
  });
  getEmployeesInfo.forEach(async (employee) => {
    NewRecords.push({
      PersonName: {
        PersonFirstName: employee.PersonFirstName,
        PersonSecondName: employee.PersonSecondName,
        PersonThirdName: employee.PersonThirdName,
        PersonFourthName: employee.PersonFourthName,
      },
      PersonCode: employee.PersonCode,
      PersonNationalId: employee.PersonRaqamQawmy,
      PersonInsuranceId: employee.PersonRaqamTa2meeny,
      PersonNumberOfWorkingYears:
        newDate.getFullYear() - employee.PersonTaree5Ta3yeen.getFullYear(),
      PersonNumberOfInsuranceYears: employee.PersonSanawatTa2meen,
      PersonInsuranceValue: employee.PersonTa2meenValue,
      InsuranceBySherkaPercentage: percentage,
      FinalValue: calculateFinalInsuranceValue(
        percentage,
        employee.PersonTa2meenValue
      ),
      Month: newDate.getMonth() + 1,
      Year: newDate.getFullYear(),
    });
  });
  return NewRecords;
};

const getInfoByCode = async (
  req: NextApiRequest,
  res: NextApiResponse,
  code: number,
  month: number,
  year: number
) => {
  const getInsuranceInfo =
    await prisma.personTa2meenatPaidBySherkaAndByPerson.findFirst({
      where: {
        PersonCode: code,
        Month: month,
        Year: year,
      },
      select: {
        // Insurance Value
        PersonTa2meenValueAtThatMonth: true,
        // Percentage of Sherka
        Ta2meenPercentagePaidBySherkaAtThatMonth: true,
        // Final Value
        Ta2meenValuePaidBySherkaAtThatMonth: true,
      },
    });
  return getInsuranceInfo;
};

const renderPastInsurance = async (
  req: NextApiRequest,
  res: NextApiResponse,
  month: number,
  year: number
) => {
  const OldRecords: InsuranceModel[] = [];
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
      PersonTaree5Ta3yeen: true,
      PersonSanawatTa2meen: true,
    },
  });
  getEmployeesInfo.forEach(async (employee) => {
    const getInsuranceInfo = await getInfoByCode(
      req,
      res,
      employee.PersonCode,
      month,
      year
    );
    if (getInsuranceInfo != null) {
      OldRecords.push({
        PersonName: {
          PersonFirstName: employee.PersonFirstName,
          PersonSecondName: employee.PersonSecondName,
          PersonThirdName: employee.PersonThirdName,
          PersonFourthName: employee.PersonFourthName,
        },
        PersonCode: employee.PersonCode,
        PersonNationalId: employee.PersonRaqamQawmy,
        PersonInsuranceId: employee.PersonRaqamTa2meeny,
        PersonNumberOfWorkingYears:
          new Date().getFullYear() - employee.PersonTaree5Ta3yeen.getFullYear(),
        PersonNumberOfInsuranceYears: employee.PersonSanawatTa2meen,
        PersonInsuranceValue: getInsuranceInfo.PersonTa2meenValueAtThatMonth,
        InsuranceBySherkaPercentage:
          getInsuranceInfo.Ta2meenPercentagePaidBySherkaAtThatMonth,
        FinalValue: getInsuranceInfo.Ta2meenValuePaidBySherkaAtThatMonth,
        Month: month,
        Year: year,
      });
    }
  });
  return OldRecords;
};

const checkIfInsuranceExists = async (month: number, year: number) => {
  const getInsuranceInfo =
    await prisma.personTa2meenatPaidBySherkaAndByPerson.findFirst({
      where: {
        Month: month,
        Year: year,
      },
    });
  if (getInsuranceInfo) {
    return true;
  } else {
    return false;
  }
};

const sendInsuranceForMonth = async (
  month: number,
  year: number,
  InsuranceModels: sendInsuranceModel[]
) => {
  if ((await checkIfInsuranceExists(month, year)) === false) {
    const ratios = getInsurancePercentageRatio();
    InsuranceModels.forEach(async (insurance) => {
      await prisma.personTa2meenatPaidBySherkaAndByPerson.create({
        data: {
          PersonCode: insurance.PersonCode,
          Month: month,
          Year: year,
          PersonTa2meenValueAtThatMonth:
            insurance.PersonTa2meenValueAtThatMonth,
          Ta2meenPercentagePaidBySherkaAtThatMonth: (
            await ratios
          ).percentageRatioOfSherka,
          Ta2meenValuePaidBySherkaAtThatMonth:
            insurance.Ta2meenValuePaidBySherkaAtThatMonth,
          Ta2meenPercentagePaidByPersonAtThatMonth: (
            await ratios
          ).percentageRatioOfPerson,
          Ta2meenValuePaidByPersonAtThatMonth:
            insurance.Ta2meenValuePaidByPersonAtThatMonth,
        },
      });
    });
  } else {
    console.log("Insurance Already Exists");
  }
};

export {
  renderNewInsurance,
  getInsurancePercentageRatio,
  renderPastInsurance,
  sendInsuranceForMonth,
  checkIfInsuranceExists,
};
