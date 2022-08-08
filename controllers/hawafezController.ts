import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { HawafezModel, HawafezModelHistory } from "../models/hawafezModel";
import getWorkingHours from "./getWorkingHours";
import { getMorattabAndDarebaPercentage } from "./taxesController";

const getHawafezResons = async () => {
  const reasons = await prisma.hafezReasons.findMany({
    where: {
      deletedAt: null,
    },
  });
  return reasons;
};

// this will be used in all types of hawafez addition
const createHafezMove = async (id: number, SubmitPersonCode: number) => {
  const newMove = await prisma.hafezSubmitMove.create({
    data: {
      HafezHistoryId: id,
      SubmitPersonCode: SubmitPersonCode,
    },
  });
  return newMove;
};

const createHafezPure = async (
  req: NextApiRequest,
  res: NextApiResponse,
  model: HawafezModel
) => {
  try {
    const hafez = await prisma.personHafezHistory.create({
      data: {
        PersonHafezId: model.PersonHafezId,
        HafezReasonID: model.HafezReasonID,
        PureHafezValue: model.PureHafezValue,
        DayOfHafez: model.DayOfHafez,
        MonthOfHafez: model.MonthOfHafez,
        YearOfHafez: model.YearOfHafez,
        HafezTotalValue: model.PureHafezValue,
        NumberOfBonusHours: 0,
        NumberOfBonusDays: 0,
        HafezBonusHourRatio: 0,
        HafezBonusDayRatio: 0,
      },
    });
    const newMove = await createHafezMove(hafez.id, model.SubmitPersonCode);
    return {
      hafez,
      newMove,
    };
  } catch (error) {
    return error;
  }
};

const createHafezExtraHours = async (model: HawafezModel) => {
  try {
    const morattab = await getMorattabAndDarebaPercentage(model.PersonHafezId);
    const hafez = await prisma.personHafezHistory.create({
      data: {
        PersonHafezId: model.PersonHafezId,
        HafezReasonID: model.HafezReasonID,
        PureHafezValue: 0,
        NumberOfBonusHours: model.NumberOfBonusHours,
        HafezBonusHourRatio: model.HafezBonusHourRatio,
        HafezTotalValue:
          ((model.NumberOfBonusHours *
            model.HafezBonusHourRatio *
            morattab.morattab) /
            30) *
          (
            await getWorkingHours()
          ).NumberOfWorkingHours,
        NumberOfBonusDays: 0,
        HafezBonusDayRatio: 0,
        DayOfHafez: model.DayOfHafez,
        MonthOfHafez: model.MonthOfHafez,
        YearOfHafez: model.YearOfHafez,
      },
    });
    const newMove = await createHafezMove(hafez.id, model.SubmitPersonCode);
    return {
      hafez,
      newMove,
    };
  } catch (error) {
    return error;
  }
};

const createHafezExtraDays = async (model: HawafezModel) => {
  try {
    const morattab = await getMorattabAndDarebaPercentage(model.PersonHafezId);
    const hafez = await prisma.personHafezHistory.create({
      data: {
        PersonHafezId: model.PersonHafezId,
        HafezReasonID: model.HafezReasonID,
        PureHafezValue: 0,
        NumberOfBonusDays: model.NumberOfBonusDays,
        HafezBonusDayRatio: model.HafezBonusDayRatio,
        HafezTotalValue:
          (model.NumberOfBonusDays *
            model.HafezBonusDayRatio *
            morattab.morattab) /
          30,
        NumberOfBonusHours: 0,
        HafezBonusHourRatio: 0,
        DayOfHafez: model.DayOfHafez,
        MonthOfHafez: model.MonthOfHafez,
        YearOfHafez: model.YearOfHafez,
      },
    });
    const newMove = await createHafezMove(hafez.id, model.SubmitPersonCode);
    return {
      hafez,
      newMove,
    };
  } catch (error) {
    return error;
  }
};

const calculateTotalHawafezinMonth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  month: number,
  year: number
) => {
  const response: HawafezModelHistory[] = [];
  const getEmployees = await prisma.person.findMany({
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
  for (const employee of getEmployees) {
    const getHafez = await prisma.personHafezHistory.findMany({
      where: {
        PersonHafezId: employee.PersonCode,
        MonthOfHafez: month,
        YearOfHafez: year,
      },
      select: {
        PersonHafezId: true,
        PureHafezValue: true,
        NumberOfBonusHours: true,
        NumberOfBonusDays: true,
        HafezBonusHourRatio: true,
        HafezBonusDayRatio: true,
        HafezTotalValue: true,
      },
    });
    const totalHawafezinMonth = getHafez.reduce(
      // @ts-ignore
      (acc, curr) => acc + curr.HafezTotalValue,
      0
    );
    response.push({
      PersonCode: employee.PersonCode,
      PersonName: {
        PersonFirstName: employee.PersonFirstName,
        PersonSecondName: employee.PersonSecondName,
        PersonThirdName: employee.PersonThirdName,
        PersonFourthName: employee.PersonFourthName,
      },
      totalHawafezinThatMonth: totalHawafezinMonth,
    });
  }
  return response;
};

export {
  createHafezExtraHours,
  createHafezExtraDays,
  createHafezPure,
  createHafezMove,
  calculateTotalHawafezinMonth,
  getHawafezResons,
};
