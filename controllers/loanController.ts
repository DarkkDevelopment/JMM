import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { SolfaModel } from "../models/SolfaModel";
import getLoanPercentage from "./getLoanPercentage";

const getSolfaHistory = async (
  req: NextApiRequest,
  res: NextApiResponse,
  code: number,
  isApproved: boolean,
  isDoneAndPaid: boolean
) => {
  const solfaHistory = await prisma.personSolfaPerMonth.findMany({
    where: {
      PersonCode: code,
      IsApproved: isApproved,
      IsDoneAndPaid: isDoneAndPaid,
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

const renderLoanHistoryByDate = async (
  req: NextApiRequest,
  res: NextApiResponse
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
  employees.forEach(async (employee) => {
    const solfaHistory = await getSolfaHistory(
      req,
      res,
      employee.PersonCode,
      true,
      false
    );
    const CurrentMorattab = await getCurrentMorattab(
      req,
      res,
      employee.PersonCode
    );
    if (solfaHistory != null && CurrentMorattab != null) {
      historyModels.push({
        PersonName: {
          PersonFirstName: employee.PersonFirstName,
          PersonSecondName: employee.PersonSecondName,
          PersonThirdName: employee.PersonThirdName,
          PersonFourthName: employee.PersonFourthName,
        },
        PersonCode: employee.PersonCode,
        SolfaLimitAtThatMonth: CurrentMorattab * loanPercentage!.Value,
        LastSolfaValue: solfaHistory[0]?.SolfaValue,
        LastSolfaRequestDate: solfaHistory[0]?.SolfaRequestDate,
        LastSolfaMonthToBeApplied: solfaHistory[0]?.SolfaMonthToBeApplied,
        LastSolfaYearToBeApplied: solfaHistory[0]?.SolfaYearToBeApplied,
      });
    }
  });
  return historyModels;
};

export { renderLoanHistoryByDate, getCurrentMorattab };
