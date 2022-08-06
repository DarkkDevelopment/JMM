import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { PayrolModel } from "../models/payrolModel";
import getWorkingHours from "./getWorkingHours";
import { getMorattabAndDarebaPercentage } from "./taxesController";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const calcTotalKhasmValue = async (
  req: NextApiRequest,
  res: NextApiResponse,
  code: number,
  month: number,
  year: number
) => {
  const total = await prisma.personKhasmHistory.findMany({
    where: {
      PersonKhasmId: code,
      MonthOfKhasm: month,
      YearOfKhasm: year,
    },
    select: {
      KhasmLateValue: true,
    },
  });
  let totalKhsomatInMonth = 0;
  total.forEach((khasm) => {
    // @ts-ignore
    totalKhsomatInMonth += khasm?.KhasmLateValue;
  });
  return totalKhsomatInMonth;
};
const calcTotalHafezValue = async (
  req: NextApiRequest,
  res: NextApiResponse,
  code: number,
  month: number,
  year: number
) => {
  const total = await prisma.personHafezHistory.findMany({
    where: {
      PersonHafezId: code,
      MonthOfHafez: month,
      YearOfHafez: year,
    },
    select: {
      HafezTotalValue: true,
    },
  });
  let totalKhsomatInMonth = 0;
  total.forEach((khasm) => {
    // @ts-ignore
    totalKhsomatInMonth += khasm?.HafezTotalValue;
  });
  return totalKhsomatInMonth;
};
const getTotalSolafInMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const totalSolafInMonth = await prisma.personSolfaPerMonth.findMany({
    where: {
      PersonCode: code,
      SolfaMonthToBeApplied: month,
      SolfaYearToBeApplied: year,
      IsDoneAndPaid: false,
      IsApproved: true,
    },
    select: {
      SolfaValue: true,
    },
  });
  let total = 0;
  totalSolafInMonth.forEach((solaf) => {
    total += solaf.SolfaValue;
  });
  return total;
};
const getTa2meenPercentage = async () => {
  const Ta2meenPercentagePaidByPerson =
    await prisma.ta2meenatFixedPercentage.findFirst({
      select: {
        Ta2meenatPercentagePaidByPerson: true,
      },
    });
  return Ta2meenPercentagePaidByPerson!.Ta2meenatPercentagePaidByPerson;
};
const getTotalNumberOfBonusHoursAndValueInThatMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const getMorattabByCode =
    await prisma.personCurrentMorattabAndDarayebPercentage.findUnique({
      where: {
        PersonCode: code,
      },
      select: {
        CurrentMorattab: true,
      },
    });

  const TotalNumberOfBonusHoursInMonthAndValue =
    await prisma.personHafezHistory.findMany({
      where: {
        PersonHafezId: code,
        MonthOfHafez: month,
        YearOfHafez: year,
      },
      select: {
        NumberOfBonusHours: true,
        HafezBonusHourRatio: true,
      },
    });
  let totalNumberOfhours = 0;
  let totalValue = 0;
  TotalNumberOfBonusHoursInMonthAndValue.forEach(async (bonus) => {
    // @ts-ignore
    totalNumberOfhours += bonus?.NumberOfBonusHours;
    // @ts-ignore
    totalValue +=
      // @ts-ignore
      (bonus?.NumberOfBonusHours *
        // @ts-ignore
        bonus?.HafezBonusHourRatio *
        getMorattabByCode!.CurrentMorattab *
        30) /
      (await getWorkingHours());
  });
  return { totalNumberOfhours, totalValue };
};
const getTotalNumberOfLateHoursAndValueInThatMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const totalNumberOfLateHoursInMonthAndValue =
    await prisma.personKhasmHistory.findMany({
      where: {
        PersonKhasmId: code,
        MonthOfKhasm: month,
        YearOfKhasm: year,
      },
      select: {
        NumberOfLateHours: true,
        KhasmLateHourRatio: true,
      },
    });
  let totalNumberOfhours = 0;
  let totalValue = 0;
  totalNumberOfLateHoursInMonthAndValue.forEach(async (bonus) => {
    // @ts-ignore
    totalNumberOfhours += bonus?.NumberOfLateHours;
    // @ts-ignore
    totalValue +=
      // @ts-ignore
      (bonus?.NumberOfLateHours *
        // @ts-ignore
        bonus?.KhasmLateHourRatio *
        30) /
      (await getWorkingHours());
  });
  return { totalNumberOfhours, totalValue };
};
const getTotalNumberOfBonusDaysAndValueInThatMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const getMorattabByCode =
    await prisma.personCurrentMorattabAndDarayebPercentage.findUnique({
      where: {
        PersonCode: code,
      },
      select: {
        CurrentMorattab: true,
      },
    });

  const TotalNumberOfBonusDaysInMonthAndValue =
    await prisma.personHafezHistory.findMany({
      where: {
        PersonHafezId: code,
        MonthOfHafez: month,
        YearOfHafez: year,
      },
      select: {
        NumberOfBonusDays: true,
        HafezBonusDayRatio: true,
      },
    });
  let totalNumberOfdays = 0;
  let totalValue = 0;
  TotalNumberOfBonusDaysInMonthAndValue.forEach(async (bonus) => {
    // @ts-ignore
    totalNumberOfdays += bonus?.NumberOfBonusDays;
    // @ts-ignore
    totalValue +=
      // @ts-ignore
      bonus?.NumberOfBonusDays *
      // @ts-ignore
      bonus?.HafezBonusDayRatio *
      getMorattabByCode!.CurrentMorattab *
      30;
  });
  return { totalNumberOfdays, totalValue };
};
const getTotalNumberOfGheyabDaysAndValueInThatMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const totalNumberOfGheyabDaysInMonthAndValue =
    await prisma.personKhasmHistory.findMany({
      where: {
        PersonKhasmId: code,
        MonthOfKhasm: month,
        YearOfKhasm: year,
      },
      select: {
        NumberOfGhyabDays: true,
        KhasmGhyabDayRatio: true,
      },
    });
  let totalNumberOfdays = 0;
  let totalValue = 0;
  totalNumberOfGheyabDaysInMonthAndValue.forEach(async (bonus) => {
    // @ts-ignore
    totalNumberOfdays += bonus?.NumberOfGhyabDays;
    // @ts-ignore
    totalValue +=
      // @ts-ignore
      bonus?.NumberOfGhyabDays *
      // @ts-ignore
      bonus?.KhasmGhyabDayRatio *
      30;
  });
  return { totalNumberOfdays, totalValue };
};
const getTotalPureKhsomatInMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const totalPureKhsomatInMonth = await prisma.personKhasmHistory.findMany({
    where: {
      PersonKhasmId: code,
      MonthOfKhasm: month,
      YearOfKhasm: year,
    },
    select: {
      PureKhasmValue: true,
    },
  });
  let total = 0;
  totalPureKhsomatInMonth.forEach((khsomat) => {
    // @ts-ignore
    total += khsomat?.PureKhasmValue;
  });
  return total;
};
const getTotalPureHafezInMonth = async (
  code: number,
  month: number,
  year: number
) => {
  const totalPureHafezInMonth = await prisma.personHafezHistory.findMany({
    where: {
      PersonHafezId: code,
      MonthOfHafez: month,
      YearOfHafez: year,
    },
    select: {
      PureHafezValue: true,
    },
  });
  let total = 0;
  totalPureHafezInMonth.forEach((hafez) => {
    // @ts-ignore
    total += hafez?.PureHafezValue;
  });
  return total;
};

const renderNewPayrols = async (req: NextApiRequest, res: NextApiResponse) => {
  const NewRecords: PayrolModel[] = [];
  const Ta2meenPercentagePaidByPerson = getTa2meenPercentage();
  const getEmployess = await prisma.person.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      PersonCode: true,
      PersonFirstName: true,
      PersonSecondName: true,
      PersonThirdName: true,
      PersonFourthName: true,
      PersonTa2meenValue: true,
    },
  });
  getEmployess.forEach(async (employee) => {
    const MorattabAndDarayebPercentage = await getMorattabAndDarebaPercentage(
      employee.PersonCode
    );
    const totalSolafInMonth = await getTotalSolafInMonth(
      employee.PersonCode,
      currentMonth,
      currentYear
    );
    const calcTotalKhsomat = await calcTotalKhasmValue(
      req,
      res,
      employee.PersonCode,
      currentMonth,
      currentYear
    );
    const calcTotalHafez = await calcTotalHafezValue(
      req,
      res,
      employee.PersonCode,
      currentMonth,
      currentYear
    );
    const TotalNumberOfBonusHoursAndTheirValues =
      await getTotalNumberOfBonusHoursAndValueInThatMonth(
        employee.PersonCode,
        currentMonth,
        currentYear
      );
    const TotalNumberOfLateHoursAndTheirValues =
      await getTotalNumberOfLateHoursAndValueInThatMonth(
        employee.PersonCode,
        currentMonth,
        currentYear
      );
    const TotalNumberOfBonusDaysAndTheirValues =
      await getTotalNumberOfBonusDaysAndValueInThatMonth(
        employee.PersonCode,
        currentMonth,
        currentYear
      );
    const TotalNumberOfGheyabDaysAndTheirValues =
      await getTotalNumberOfGheyabDaysAndValueInThatMonth(
        employee.PersonCode,
        currentMonth,
        currentYear
      );
    const TotalPureKhsomatInMonth = await getTotalPureKhsomatInMonth(
      employee.PersonCode,
      currentMonth,
      currentYear
    );
    const TotalPureHafezInMonth = await getTotalPureHafezInMonth(
      employee.PersonCode,
      currentMonth,
      currentYear
    );
    NewRecords.push({
      PersonName: {
        PersonFirstName: employee.PersonFirstName,
        PersonSecondName: employee.PersonSecondName,
        PersonThirdName: employee.PersonThirdName,
        PersonFourthName: employee.PersonFourthName,
      },
      PersonCode: employee.PersonCode,
      PersonMorattabAtThatMonth: MorattabAndDarayebPercentage.morattab,
      Total3adadSa3atElTa25eerAtThatMonth:
        TotalNumberOfLateHoursAndTheirValues.totalNumberOfhours,
      ValueOfKhasmFor3adadSa3atElTa25eerAtThatMonth:
        TotalNumberOfLateHoursAndTheirValues.totalValue,
      Total3adadAyamEl5asmAwElGheyabaAtThatMonth:
        TotalNumberOfGheyabDaysAndTheirValues.totalNumberOfdays,
      ValueOfKhasmForTotal3adadAyamEl5asmAwElGheyabaAtThatMonth:
        TotalNumberOfGheyabDaysAndTheirValues.totalValue,
      TotalValueOfIndividualKhasmAtThatMonth: TotalPureKhsomatInMonth,
      TotalKhasmSummationValue: calcTotalKhsomat,
      Total3adadSa3atElExtraAtThatMonth:
        TotalNumberOfBonusHoursAndTheirValues.totalNumberOfhours,
      ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth:
        TotalNumberOfBonusHoursAndTheirValues.totalValue,
      Total3adadAyamElEdafyAwElHafezAtThatMonth:
        TotalNumberOfBonusDaysAndTheirValues.totalNumberOfdays,
      ValueOfHafezForTotal3adadAyamElEdafyAwElHafezAtThatMonth:
        TotalNumberOfBonusDaysAndTheirValues.totalValue,
      TotalValueOfIndividualHafezAtThatMonth: TotalPureHafezInMonth,
      TotalHafezSummationValue: calcTotalHafez,
      TotalValueOfSolafTakenAtThatMonth: totalSolafInMonth,
      DrayebPercentageForMorattabAtThatMonth:
        MorattabAndDarayebPercentage.dareebaPercentage,
      TotalValueOfDarayebAtThatMonth:
        MorattabAndDarayebPercentage.dareebaPercentage *
        MorattabAndDarayebPercentage.morattab,
      PersonTa2meenValue: employee.PersonTa2meenValue,
      PersonTa2meenPercentage: await Ta2meenPercentagePaidByPerson,
      TotalValueOfTa2meenAtThatMonth:
        employee.PersonTa2meenValue * (await Ta2meenPercentagePaidByPerson),
      NetSalary:
        MorattabAndDarayebPercentage.morattab -
        calcTotalKhsomat +
        calcTotalHafez -
        totalSolafInMonth -
        employee.PersonTa2meenValue * (await Ta2meenPercentagePaidByPerson) -
        MorattabAndDarayebPercentage.dareebaPercentage *
          MorattabAndDarayebPercentage.morattab,
      PersonPayrollDate: new Date(),
      PayrolMonth: currentMonth,
      PayrolYear: currentYear,
    });
  });
  return NewRecords;
};

const getPayrolHistoryRecords = async (
  code: number,
  month: number,
  year: number
) => {
  const getPayrolByMonthAndYear = await prisma.personPayrollHistory.findFirst({
    where: {
      PersonCode: code,
      PayrollMonth: month,
      PayrollYear: year,
    },
  });
  return getPayrolByMonthAndYear;
};

const renderPastPayrols = async (
  req: NextApiRequest,
  res: NextApiResponse,
  month: number,
  year: number
) => {
  const PastRecords: PayrolModel[] = [];

  const getEmployess = await prisma.person.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      PersonCode: true,
      PersonFirstName: true,
      PersonSecondName: true,
      PersonThirdName: true,
      PersonFourthName: true,
    },
  });
  getEmployess.forEach(async (employee) => {
    const PayrolHistory = await getPayrolHistoryRecords(
      employee.PersonCode,
      month,
      year
    );
    if (PayrolHistory) {
      PastRecords.push({
        PersonName: {
          PersonFirstName: employee.PersonFirstName,
          PersonSecondName: employee.PersonSecondName,
          PersonThirdName: employee.PersonThirdName,
          PersonFourthName: employee.PersonFourthName,
        },
        PersonCode: employee.PersonCode,
        PersonMorattabAtThatMonth: PayrolHistory.PersonMorattabAtThatMonth,
        Total3adadSa3atElTa25eerAtThatMonth:
          PayrolHistory.Total3adadSa3atElTa25eerAtThatMonth,
        ValueOfKhasmFor3adadSa3atElTa25eerAtThatMonth:
          PayrolHistory.ValueOfKhasmForTotal3adadSa3atElTa25eerAtThatMonth,
        Total3adadAyamEl5asmAwElGheyabaAtThatMonth:
          PayrolHistory.Total3adadAyyamEl5asmAwElGhyabAtThatMonth,
        ValueOfKhasmForTotal3adadAyamEl5asmAwElGheyabaAtThatMonth:
          PayrolHistory.ValueOfKhasmForTotal3adadAyyamEl5asmAwElGhyabAtThatMonth,
        TotalValueOfIndividualKhasmAtThatMonth:
          PayrolHistory.TotalValueOfIndividualKhasmAtThatMonth,
        TotalKhasmSummationValue: PayrolHistory.TotalKhasmSummationValue,
        Total3adadSa3atElExtraAtThatMonth:
          PayrolHistory.Total3adadSa3atElExtraAtThatMonth,
        ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth:
          PayrolHistory.ValueOfHafezForTotal3adadSa3atElExtraAtThatMonth,
        Total3adadAyamElEdafyAwElHafezAtThatMonth:
          PayrolHistory.Total3adadAyyamElEdafyAwElHafezAtThatMonth,
        ValueOfHafezForTotal3adadAyamElEdafyAwElHafezAtThatMonth:
          PayrolHistory.ValueOfHafezForTotalTotal3adadAyyamElEdafyAwElHafezAtThatMonth,
        TotalValueOfIndividualHafezAtThatMonth:
          PayrolHistory.TotalValueOfIndividualHafezAtThatMonth,
        TotalHafezSummationValue: PayrolHistory.TotalHafezSummationValue,
        TotalValueOfSolafTakenAtThatMonth:
          PayrolHistory.TotalValueOfSolafTakenAtThatMonth,
        DrayebPercentageForMorattabAtThatMonth:
          PayrolHistory.DarayebPercentageForThatMorattabAtThatMonth,
        TotalValueOfDarayebAtThatMonth:
          PayrolHistory.TotalValueOfDarayebAtThatMonth,
        PersonTa2meenValue: PayrolHistory.PersonTa2meenValue,
        PersonTa2meenPercentage: PayrolHistory.PersonTa2meenPercentage,
        TotalValueOfTa2meenAtThatMonth:
          PayrolHistory.TotalValueOfTa2meenatAtThatMonth,
        NetSalary: PayrolHistory.NetSalary,
        PersonPayrollDate: PayrolHistory.PersonPayrollDate,
        PayrolMonth: PayrolHistory.PayrollMonth,
        PayrolYear: PayrolHistory.PayrollYear,
      });
    }
  });
  return PastRecords;
};

const checkIfPayrolExists = async (date: Date): Promise<boolean> => {
  const ourDate = new Date(date);
  const getPayrol = await prisma.personPayrollHistory.findFirst({
    where: {
      PayrollMonth: ourDate.getMonth() + 1,
      PayrollYear: ourDate.getFullYear(),
    },
  });
  if (getPayrol) {
    return true;
  } else {
    return false;
  }
};

export { renderNewPayrols, renderPastPayrols, checkIfPayrolExists };
