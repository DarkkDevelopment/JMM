import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import {
  hawafezHistoryForPerson,
  HawafezModel,
  HawafezModelHistory,
} from "../models/hawafezModel";
import getPersonTa2meenValue from "./getPersonTa2meenValue";
import getWorkingHours from "./getWorkingHours";
import {
  checkIfPayrolExists,
  getLastMonthAndYearClosed,
} from "./payrolController";
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

// todo : person ta2meen value from table person insted of morattab.morattab as that is the egmaly morattab
const createHafezExtraHours = async (model: HawafezModel) => {
  try {
    const personAsasMorattab = await getPersonTa2meenValue(model.PersonHafezId);
    if (model.NumberOfBonusHours > 0) {
      const numbOfHours = (await getWorkingHours()).NumberOfWorkingHours;
      const morattabPerHour = personAsasMorattab / (numbOfHours * 30);
      const hafez = await prisma.personHafezHistory.create({
        data: {
          PersonHafezId: model.PersonHafezId,
          HafezReasonID: model.HafezReasonID,
          PureHafezValue: 0,
          NumberOfBonusHours: model.NumberOfBonusHours,
          HafezBonusHourRatio: model.HafezBonusHourRatio,
          HafezTotalValue:
            model.NumberOfBonusHours *
            model.HafezBonusHourRatio *
            morattabPerHour,
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
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const createHafezExtraDays = async (model: HawafezModel) => {
  try {
    const personAsasMorattab = await getPersonTa2meenValue(model.PersonHafezId);
    const numbOfHours = (await getWorkingHours()).NumberOfWorkingHours;
    const morattabPerHour = personAsasMorattab / (numbOfHours * 30);
    if (model.NumberOfBonusDays > 0) {
      const hafez = await prisma.personHafezHistory.create({
        data: {
          PersonHafezId: model.PersonHafezId,
          HafezReasonID: model.HafezReasonID,
          PureHafezValue: 0,
          NumberOfBonusDays: model.NumberOfBonusDays,
          HafezBonusDayRatio: model.HafezBonusDayRatio,
          HafezTotalValue:
            model.NumberOfBonusDays *
            model.HafezBonusDayRatio *
            morattabPerHour,
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
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const calculateTotalHawafezinMonth = async (year: number) => {
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
        YearOfHafez: year,
        deletedAt: null,
      },
      select: {
        id: true,
        PersonHafezId: true,
        PureHafezValue: true,
        NumberOfBonusHours: true,
        NumberOfBonusDays: true,
        HafezBonusHourRatio: true,
        HafezBonusDayRatio: true,
        HafezTotalValue: true,
        DayOfHafez: true,
        MonthOfHafez: true,
        YearOfHafez: true,
      },
    });

    const history: hawafezHistoryForPerson[] = getHafez.map((h) => {
      return {
        hafezId: h.id,
        PureValue: Number(h.PureHafezValue),
        HafezValue: Number(h.HafezTotalValue),
        DayOfHafez: Number(h.DayOfHafez),
        MonthOfHafez: Number(h.MonthOfHafez),
        YearOfHafez: Number(h.YearOfHafez),
      };
    });

    const lastMonthAndYearClosed = await getLastMonthAndYearClosed();

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
      HafezHistory: history,
      lastMonthClosed: lastMonthAndYearClosed
        ? lastMonthAndYearClosed.PayrollMonth
        : null,
      lastYearClosed: lastMonthAndYearClosed
        ? lastMonthAndYearClosed.PayrollYear
        : null,
    });
  }
  return response;
};

const deletePureHafez = async (id: number) => {
  const deleteHafez = await prisma.personHafezHistory.delete({
    where: {
      id: id,
    },
  });
  return deleteHafez;
};

export {
  createHafezExtraHours,
  createHafezExtraDays,
  createHafezPure,
  createHafezMove,
  calculateTotalHawafezinMonth,
  getHawafezResons,
  deletePureHafez,
};
