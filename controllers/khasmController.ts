import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { KhasmModel, KhasmModelHistory } from "../models/khasmModel";
import getWorkingHours from "./getWorkingHours";
import { getMorattabAndDarebaPercentage } from "./taxesController";

const getKhasmReasons = async () => {
  const reasons = await prisma.khasmReasons.findMany({
    where: {
      deletedAt: null,
    },
  });
  return reasons;
};

// this will be used in all types of hawafez addition
const createKhasmMove = async (id: number, SubmitPersonCode: number) => {
  const newMove = await prisma.khasmSubmitMove.create({
    data: {
      KhasmHistoryId: id,
      SubmitPersonCode: SubmitPersonCode,
    },
  });
  console.log(newMove);
  return newMove;
};

const createPureKhasm = async (
  req: NextApiRequest,
  res: NextApiResponse,
  model: KhasmModel
) => {
  try {
    const khasm = await prisma.personKhasmHistory.create({
      data: {
        PersonKhasmId: model.PersonKhasmId,
        KhasmReasonID: model.KhasmReasonID,
        PureKhasmValue: model.PureKhasmValue,
        DayOfKhasm: model.DayOfKhasm,
        MonthOfKhasm: model.MonthOfKhasm,
        YearOfKhasm: model.YearOfKhasm,
        NumberOfLateHours: 0,
        KhasmLateHourRatio: 0,
        KhasmLateValue: model.PureKhasmValue,
        NumberOfGhyabDays: 0,
        KhasmGhyabDayRatio: 0,
      },
    });
    const newMove = await createKhasmMove(khasm.id, model.SubmitPersonCode);
    return { khasm, newMove };
  } catch (error) {
    return error;
  }
};

const createKhasmLateHours = async (model: KhasmModel) => {
  try {
    const morattab = await getMorattabAndDarebaPercentage(model.PersonKhasmId);
    const khasm = await prisma.personKhasmHistory.create({
      data: {
        PersonKhasmId: model.PersonKhasmId,
        KhasmReasonID: model.KhasmReasonID,
        DayOfKhasm: model.DayOfKhasm,
        MonthOfKhasm: model.MonthOfKhasm,
        YearOfKhasm: model.YearOfKhasm,
        NumberOfLateHours: model.NumberOfLateHours,
        KhasmLateHourRatio: model.KhasmLateHourRatio,
        KhasmLateValue:
          ((model.NumberOfLateHours *
            model.KhasmLateHourRatio *
            morattab.morattab) /
            30) *
          (
            await getWorkingHours()
          ).NumberOfWorkingHours,
        PureKhasmValue: 0,
        NumberOfGhyabDays: 0,
        KhasmGhyabDayRatio: 0,
      },
    });
    const newMove = await createKhasmMove(khasm.id, model.SubmitPersonCode);
    return { khasm, newMove };
  } catch (error) {
    return error;
  }
};

const createKhasmGheyabDays = async (
  req: NextApiRequest,
  res: NextApiResponse,
  model: KhasmModel
) => {
  try {
    const morattab = await getMorattabAndDarebaPercentage(model.PersonKhasmId);
    const khasm = await prisma.personKhasmHistory.create({
      data: {
        PersonKhasmId: model.PersonKhasmId,
        KhasmReasonID: model.KhasmReasonID,
        DayOfKhasm: model.DayOfKhasm,
        MonthOfKhasm: model.MonthOfKhasm,
        YearOfKhasm: model.YearOfKhasm,
        NumberOfGhyabDays: model.NumberOfGhyabDays,
        KhasmGhyabDayRatio: model.KhasGhyabDayRatio,
        KhasmLateValue:
          (model.NumberOfGhyabDays *
            model.KhasGhyabDayRatio *
            morattab.morattab) /
          30,
        NumberOfLateHours: 0,
        KhasmLateHourRatio: 0,
        PureKhasmValue: 0,
      },
    });
    const newMove = await createKhasmMove(khasm.id, model.SubmitPersonCode);
    return { khasm, newMove };
  } catch (error) {
    return error;
  }
};

const calculateTotalKhsomatinMonth = async (
  req: NextApiRequest,
  res: NextApiResponse,
  month: number,
  year: number
) => {
  const response: KhasmModelHistory[] = [];
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
    const getKhasm = await prisma.personKhasmHistory.findMany({
      where: {
        PersonKhasmId: employee.PersonCode,
        MonthOfKhasm: month,
        YearOfKhasm: year,
      },
      select: {
        PersonKhasmId: true,
        PureKhasmValue: true,
        NumberOfLateHours: true,
        KhasmLateHourRatio: true,
        NumberOfGhyabDays: true,
        KhasmGhyabDayRatio: true,
        KhasmLateValue: true,
      },
    });
    const totalKhsomatInMonth = getKhasm.reduce(
      // @ts-ignore
      (acc, curr) => acc + curr.KhasmLateValue,
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
      totalKhasminThatMonth: totalKhsomatInMonth,
    });
  }
  return response;
};

export {
  createKhasmMove,
  createPureKhasm,
  createKhasmLateHours,
  createKhasmGheyabDays,
  calculateTotalKhsomatinMonth,
  getKhasmReasons,
};
