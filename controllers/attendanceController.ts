import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { GetAttendanceModel, HedoorModel } from "../models/AttendanceModels";
import { HawafezModel } from "../models/hawafezModel";
import { KhasmModel } from "../models/khasmModel";
import { createHafezExtraHours } from "./hawafezController";
import { createKhasmLateHours } from "./khasmController";

// todo : render new records
// funcion to get default working hours and total number of hours worked at that day
const getWorkingHoursAndTotalNumberOfWorkingHours = async () => {
  const workingHours = await prisma.workingHoursLookup.findMany({
    select: {
      StartTime: true,
      EndTime: true,
    },
  });
  const totalWorkingHours =
    workingHours[0].EndTime.getHours() - workingHours[0].StartTime.getHours();
  return { workingHours, totalWorkingHours };
};

// function to get extra Hour Ratios  and late hour ratios
const getExtraHoursRatioAndKhasmHourRatio = async () => {
  const extraAndLateRatios = await prisma.fixedHafezAndKhasmRatios.findMany({
    select: {
      FixedHafezHourRatio: true,
      FixedKhasmHourRatio: true,
    },
  });
  const extraHoursRatio = extraAndLateRatios[0].FixedHafezHourRatio;
  const khasmHoursRatio = extraAndLateRatios[0].FixedKhasmHourRatio;
  return { extraHoursRatio, khasmHoursRatio };
};

const getEmployeesWhoTookVacationInCertainDate = async (date: Date) => {
  const employeesInAgaza =
    await prisma.personAgazaRequestAndHistoryTable.findMany({
      where: {
        AgazaDate: date,
        deletedAt: null,
      },
      select: {
        PersonCode: true,
      },
    });
  return employeesInAgaza;
};

const renderNewAttendance = async (date: Date) => {
  const newAttendanceModels: GetAttendanceModel[] = [];
  const getAllEmployees = await prisma.person.findMany({
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
    orderBy: {
      PersonCode: "asc",
    },
  });
  const { workingHours, totalWorkingHours } =
    await getWorkingHoursAndTotalNumberOfWorkingHours();
  const { extraHoursRatio, khasmHoursRatio } =
    await getExtraHoursRatioAndKhasmHourRatio();

  // todo : need to check here that if employee has a vacation which is not deleted of course

  for (const employee of getAllEmployees) {
    if (
      await getEmployeesWhoTookVacationInCertainDate(date).then((res) =>
        res.find((e) => e.PersonCode === employee.PersonCode)
      )
    ) {
      continue;
    } else {
      newAttendanceModels.push({
        PersonCode: employee.PersonCode,
        PersonName: {
          PersonFirstName: employee.PersonFirstName,
          PersonSecondName: employee.PersonSecondName,
          PersonThirdName: employee.PersonThirdName,
          PersonFourthName: employee.PersonFourthName,
        },
        HodoorTime: workingHours[0].StartTime,
        EnserafTime: workingHours[0].EndTime,
        TotalNumberOfWorkingHoursAtThatDay: totalWorkingHours,
        ExtraHours: 0,
        LateHours: 0,
        ExtraFactor: extraHoursRatio,
        LateFactor: khasmHoursRatio,
        Date: new Date(),
      });
    }
  }
  return newAttendanceModels;
};

const renderOldAttendance = async (date: Date) => {
  const { extraHoursRatio, khasmHoursRatio } =
    await getExtraHoursRatioAndKhasmHourRatio();
  const OldAttendanceModels: GetAttendanceModel[] = [];
  // this will return all data needed in the model
  const getAttendanceHistoryByDate = await prisma.personHodoorEnseraf.findMany({
    where: {
      Date: date,
    },
    include: {
      Person: {
        select: {
          PersonFirstName: true,
          PersonSecondName: true,
          PersonThirdName: true,
          PersonFourthName: true,
        },
      },
    },
    orderBy: {
      PersonCode: "asc",
    },
  });
  // this will return all data needed in the model
  getAttendanceHistoryByDate.forEach((attendance) => {
    OldAttendanceModels.push({
      PersonCode: attendance.PersonCode,
      PersonName: {
        PersonFirstName: attendance.Person.PersonFirstName,
        PersonSecondName: attendance.Person.PersonSecondName,
        PersonThirdName: attendance.Person.PersonThirdName,
        PersonFourthName: attendance.Person.PersonFourthName,
      },
      HodoorTime: attendance.HodoorTime,
      EnserafTime: attendance.EnserafTime,
      TotalNumberOfWorkingHoursAtThatDay:
        attendance.TotalNumberOfWorkingHoursAtThatDay,
      ExtraHours: attendance.ExtraHours,
      LateHours: attendance.LateHours,
      ExtraFactor: extraHoursRatio,
      LateFactor: khasmHoursRatio,
      Date: attendance.Date,
    });
  });
  return OldAttendanceModels;
};

// todo : need to send attendance which will affect hawafez and khsomat and gheyab as well to make everything clear
// todo : 1- first one to add in the hedoor enseraf table
const sendHedoorEnseraf = async (HedoorEnserafModel: HedoorModel) => {
  await prisma.personHodoorEnseraf.create({
    data: {
      PersonCode: HedoorEnserafModel.PersonCode,
      HodoorTime: HedoorEnserafModel.HodoorTime,
      EnserafTime: HedoorEnserafModel.EnserafTime,
      TotalNumberOfWorkingHoursAtThatDay:
        HedoorEnserafModel.TotalNumberOfWorkingHoursAtThatDay,
      ExtraHours: HedoorEnserafModel.ExtraHours,
      LateHours: HedoorEnserafModel.LateHours,
      Date: HedoorEnserafModel.Date,
    },
  });
};

// todo : 2- We will use createHafezExtraHours function to add hawafez in hawafez history table using hawafez Model
// todo : 3- We will use createKhasmLateHours function to add khsomat in khsomat history table using khsomat Model
// need to send data to hedoor enseraf tables and hawafez and khsomat tables to make everything clear
const sendAttendanceWithHawafezAndKhsomat = async (
  HedoorModels: HedoorModel[],
  hawafezModels: HawafezModel[],
  khasmModels: KhasmModel[]
) => {
  HedoorModels.forEach(async (HedoorModel) => {
    await sendHedoorEnseraf(HedoorModel);
  });
  hawafezModels.forEach(async (model) => {
    await createHafezExtraHours(model);
  });
  khasmModels.forEach(async (model) => {
    await createKhasmLateHours(model);
  });
};

export {
  sendAttendanceWithHawafezAndKhsomat,
  renderOldAttendance,
  renderNewAttendance,
};
