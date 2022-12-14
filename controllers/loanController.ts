import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { solfaHistoryForPerson, SolfaModel } from "../models/SolfaModel";
import getLoanPercentage from "./getLoanPercentage";
import { getLastMonthAndYearClosed } from "./payrolController";

const getSolfaHistory = async (
  code: number,
  isApproved: boolean,
  isDoneAndPaid: boolean,
  year: number
) => {
  const solfaHistory = await prisma.personSolfaPerMonth.findMany({
    where: {
      PersonCode: code,
      IsApproved: isApproved,
      IsDoneAndPaid: isDoneAndPaid,
      SolfaYearToBeApplied: year,
      deletedAt: null,
    },
    orderBy: {
      SolfaRequestDate: "desc",
    },
  });
  return solfaHistory;
};

const getCurrentMorattab = async (
  req: NextApiRequest,
  res: NextApiResponse,
  code: number
) => {
  const currentMorattab =
    await prisma.personCurrentMorattabAndDarayebPercentage.findUnique({
      where: {
        PersonCode: code,
      },
      select: {
        CurrentMorattab: true,
      },
    });
  return currentMorattab?.CurrentMorattab;
};

const renderLoanHistoryByYear = async (
  req: NextApiRequest,
  res: NextApiResponse,
  year: number
) => {
  const loanPercentage = await getLoanPercentage(req, res);
  const historyModels: SolfaModel[] = [];
  const employees = await prisma.person.findMany({
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
  for (const employee of employees) {
    const solfaHistory = await getSolfaHistory(
      employee.PersonCode,
      true,
      false,
      year
    );
    const CurrentMorattab = await getCurrentMorattab(
      req,
      res,
      employee.PersonCode
    );
    const lastMonthAndYearClosed = await getLastMonthAndYearClosed();

    const history: solfaHistoryForPerson[] = solfaHistory.map((loan) => {
      return {
        solfaId: loan.id,
        solfaValue: loan.SolfaValue,
        solfaRequestDate: loan.SolfaRequestDate,
      };
    });

    if (solfaHistory != null && CurrentMorattab != null) {
      historyModels.push({
        PersonName: {
          PersonFirstName: employee.PersonFirstName,
          PersonSecondName: employee.PersonSecondName,
          PersonThirdName: employee.PersonThirdName,
          PersonFourthName: employee.PersonFourthName,
        },
        PersonCode: employee.PersonCode,
        SolfaLimitAtThatMonth: CurrentMorattab * loanPercentage,
        history: history,
        lastMonthClosed: lastMonthAndYearClosed
          ? lastMonthAndYearClosed.PayrollMonth
          : null,
        lastYearClosed: lastMonthAndYearClosed
          ? lastMonthAndYearClosed.PayrollYear
          : null,
      });
    }
  }
  return historyModels;
};

const checkIfEmployeeTokeLoanInSameMonthBefore = async (
  code: number,
  month: number,
  year: number
) => {
  const loanHistory = await getSolfaHistory(code, true, false, year);
  if (loanHistory != null) {
    const loanHistoryInSameMonthAndYear = loanHistory.filter(
      (loan) =>
        loan.SolfaMonthToBeApplied === month &&
        loan.SolfaYearToBeApplied === year
    );
    if (loanHistoryInSameMonthAndYear.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};

const deleteLoan = async (id: number) => {
  const deletedLoan = await prisma.personSolfaPerMonth.delete({
    where: {
      id,
    },
  });
  return deletedLoan;
};

// todo : this one will make all the loans in the month to be closed financially to be updated in the database
const sendLoans = async (month: number, year: number) => {
  const updatedLoans = await prisma.personSolfaPerMonth.updateMany({
    where: {
      SolfaMonthToBeApplied: month,
      SolfaYearToBeApplied: year,
    },
    data: {
      IsDoneAndPaid: true,
    },
  });
  return updatedLoans;
};

export {
  renderLoanHistoryByYear,
  getCurrentMorattab,
  checkIfEmployeeTokeLoanInSameMonthBefore,
  deleteLoan,
  sendLoans,
};
