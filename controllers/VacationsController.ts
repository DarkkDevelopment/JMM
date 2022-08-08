import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";
import { VacationsModel } from "../models/vacationsModel";

// in agaza rasmeya aw lw yom gom3a aw lw already registered el yom dah

const getVacationsInWeek = async () => {
  const VacationsInWeek = await prisma.agazaDaysInWeek.findMany({
    select: {
      DayName: true,
    },
  });
  return VacationsInWeek;
};

const checkIfDayIsInVacationDaysOfWeek = async (day: string) => {
  const agazaDays = await getVacationsInWeek();
  for (const agazaDay of agazaDays) {
    if (agazaDay.DayName === day) {
      return true;
    } else {
      return false;
    }
  }
};

const checkIfAgazaIsRegisteredBefore = async (
  personCode: number,
  agazaDate: Date
) => {
  const checkIfRegisteredBefore =
    await prisma.personAgazaRequestAndHistoryTable.findFirst({
      where: {
        PersonCode: personCode,
        AgazaDate: agazaDate,
        deletedAt: null,
      },
    });
  const exists = checkIfRegisteredBefore;
  return exists;
};

const checkForAgazaRasmeya = async (agazaDate: Date) => {
  const checkIfAgazaRasmeya = await prisma.agazatRasmyaLookup.findFirst({
    where: {
      AgazaRasmyaDate: agazaDate,
    },
  });
  if (checkIfAgazaRasmeya) {
    return true;
  } else {
    return false;
  }
};

const getAgazatRasmeya = async () => {
  const AgazatRasmeya = await prisma.agazatRasmyaLookup.findMany({
    where: {
      deletedAt: null,
    },
  });
  return AgazatRasmeya;
};

// todo : not working
const convertDateToString = (date: Date) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  console.log(newDate);
  return newDate;
};

const checkForVacation = async (personCode: number, AgazaDate: Date) => {
  const ourDate = convertDateToString(AgazaDate);
  console.log(ourDate);

  const isRegisteredBefore = await checkIfAgazaIsRegisteredBefore(
    personCode,
    AgazaDate
  );

  if (
    (await checkForAgazaRasmeya(AgazaDate)) ||
    (await checkIfDayIsInVacationDaysOfWeek(ourDate)) ||
    isRegisteredBefore
  ) {
    return true;
  } else {
    return false;
  }
};

const getVacationsAtThatDay = async (
  req: NextApiRequest,
  res: NextApiResponse,
  date: Date
) => {
  const vacationsModels: VacationsModel[] = [];
  const vacations = await prisma.personAgazaRequestAndHistoryTable.findMany({
    where: {
      AgazaDate: date,
      deletedAt: null,
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
      AgazaType: {
        select: {
          AgazaType: true,
        },
      },
    },
  });
  for (const vacation of vacations) {
    vacationsModels.push({
      PersonCode: vacation.PersonCode,
      PersonName: {
        PersonFirstName: vacation.Person.PersonFirstName,
        PersonSecondName: vacation.Person.PersonSecondName,
        PersonThirdName: vacation.Person.PersonThirdName,
        PersonFourthName: vacation.Person.PersonFourthName,
      },
      VacationType: vacation.AgazaType.AgazaType,
    });
  }
  return vacationsModels;
};

export {
  checkForVacation,
  getVacationsAtThatDay,
  getVacationsInWeek,
  getAgazatRasmeya,
};
