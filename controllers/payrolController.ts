import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { PayrolModel } from "../models/payrolModel";
import getBadalatPercentage from "../pages/api/lookupsData/getDataFromLookups/badalatPercentage";
import getElawatPercentage from "../pages/api/lookupsData/getDataFromLookups/elawatPercentage";
import getWorkingHours from "./getWorkingHours";
import { getMorattabAndDarebaPercentage } from "./taxesController";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const calcTotalKhasmValue = async (
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
    if (khasm.KhasmLateValue) {
      totalKhsomatInMonth += khasm.KhasmLateValue;
    } else {
      totalKhsomatInMonth += 0;
    }
  });
  return totalKhsomatInMonth;
};
const calcTotalHafezValue = async (
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
    if (khasm.HafezTotalValue) {
      totalKhsomatInMonth += khasm?.HafezTotalValue;
    } else {
      totalKhsomatInMonth += 0;
    }
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
      deletedAt: null,
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
    if (bonus.HafezBonusHourRatio && bonus.NumberOfBonusHours) {
      totalNumberOfhours += bonus?.NumberOfBonusHours;
      totalValue +=
        (bonus?.NumberOfBonusHours *
          bonus?.HafezBonusHourRatio *
          getMorattabByCode!.CurrentMorattab *
          30) /
        (await getWorkingHours()).NumberOfWorkingHours;
    } else {
      totalNumberOfhours += 0;
      totalValue += 0;
    }
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
    if (bonus.KhasmLateHourRatio && bonus.NumberOfLateHours) {
      totalNumberOfhours += bonus?.NumberOfLateHours;
      totalValue +=
        (bonus?.NumberOfLateHours * bonus?.KhasmLateHourRatio * 30) /
        (await getWorkingHours()).NumberOfWorkingHours;
    } else {
      totalNumberOfhours += 0;
      totalValue += 0;
    }
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
    if (bonus.HafezBonusDayRatio && bonus.NumberOfBonusDays) {
      totalNumberOfdays += bonus?.NumberOfBonusDays;
      totalValue +=
        (bonus?.NumberOfBonusDays * bonus?.HafezBonusDayRatio * 30) /
        (await getWorkingHours()).NumberOfWorkingHours;
    } else {
      totalNumberOfdays += 0;
      totalValue += 0;
    }
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
    if (bonus.KhasmGhyabDayRatio && bonus.NumberOfGhyabDays) {
      totalNumberOfdays += bonus?.NumberOfGhyabDays;
      totalValue += bonus?.NumberOfGhyabDays * bonus?.KhasmGhyabDayRatio * 30;
    } else {
      totalNumberOfdays += 0;
      totalValue += 0;
    }
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
    if (khsomat.PureKhasmValue) {
      total += khsomat?.PureKhasmValue;
    } else {
      total += 0;
    }
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
    if (hafez.PureHafezValue) {
      total += hafez?.PureHafezValue;
    } else {
      total += 0;
    }
  });
  return total;
};

const getElawatPercentageController = async () => {
  try {
    const ElawatPercentage = await prisma.fixedGlobalValues.findUnique({
      where: {
        Name: "ElawatPercentage",
      },
    });
    return ElawatPercentage?.Value;
  } catch (error: any) {
    return error;
  }
};

const getBadalatPercentageController = async () => {
  try {
    const badalatPercentage = await prisma.fixedGlobalValues.findUnique({
      where: {
        Name: "BadalatPercentage",
      },
    });
    return badalatPercentage?.Value;
  } catch (error: any) {
    return error;
  }
};

const renderNewPayrols = async (): Promise<PayrolModel[]> => {
  const getElawat = await getElawatPercentageController();
  const elawat = await getBadalatPercentageController();
  // todo : get elawat and badalat percentages
  // todo : then we will multiply them with the rest of current morattab - fixed ta2menat percentage
  const NewRecords: PayrolModel[] = [];
  const Ta2meenPercentagePaidByPerson = await getTa2meenPercentage();

  if (Ta2meenPercentagePaidByPerson) {
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
    if (getEmployess.length > 0) {
      for (const employee of getEmployess) {
        const MorattabAndDarayebPercentage =
          await getMorattabAndDarebaPercentage(employee.PersonCode);
        const totalSolafInMonth = await getTotalSolafInMonth(
          employee.PersonCode,
          currentMonth,
          currentYear
        );
        const calcTotalKhsomat = await calcTotalKhasmValue(
          employee.PersonCode,
          currentMonth,
          currentYear
        );
        const calcTotalHafez = await calcTotalHafezValue(
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
            employee.PersonTa2meenValue,
          PersonTa2meenValue: employee.PersonTa2meenValue,
          PersonTa2meenPercentage: Ta2meenPercentagePaidByPerson,
          TotalValueOfTa2meenAtThatMonth:
            employee.PersonTa2meenValue * Ta2meenPercentagePaidByPerson,
          NetSalary:
            MorattabAndDarayebPercentage.morattab -
            calcTotalKhsomat +
            calcTotalHafez -
            totalSolafInMonth -
            employee.PersonTa2meenValue * Ta2meenPercentagePaidByPerson -
            MorattabAndDarayebPercentage.dareebaPercentage *
              MorattabAndDarayebPercentage.morattab,
          PersonPayrollDate: new Date(),
          PayrolMonth: currentMonth,
          PayrolYear: currentYear,
          elawatValue: getElawat * employee.PersonTa2meenValue,
          badalatValue: elawat * employee.PersonTa2meenValue,
        });
      }
    }
  }
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

const renderPastPayrols = async (month: number, year: number) => {
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
        elawatValue: PayrolHistory.elawatValue,
        badalatValue: PayrolHistory.badalatValue,
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

const getLastMonthAndYearClosed = async () => {
  const getLastMonthAndYear = await prisma.personPayrollHistory.findMany({
    select: {
      PayrollMonth: true,
      PayrollYear: true,
    },
  });
  const lastMonthAndYear = getLastMonthAndYear[getLastMonthAndYear.length - 1];
  return lastMonthAndYear;
};

export {
  renderNewPayrols,
  renderPastPayrols,
  checkIfPayrolExists,
  getLastMonthAndYearClosed,
};
