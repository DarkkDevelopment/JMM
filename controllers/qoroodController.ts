import console from "console";
import prisma from "../lib/prisma";
import { QoroodHistoryModel } from "../models/QoroodHistoryModel";

const getQardInfo = async () => {
  const QardInfo = await prisma.qorood.findMany({
    include: {
      Person: {
        select: {
          PersonCode: true,
          PersonFirstName: true,
          PersonSecondName: true,
          PersonThirdName: true,
          PersonFourthName: true,
        },
      },
    },
  });
  return QardInfo;
};

const calculateTotalSadadat = async (qardId: number) => {
  const employeeSadadat = await prisma.qoroodOzoonatHistory.findMany({
    where: {
      QardId: qardId,
    },
    select: {
      EznValue: true,
    },
  });
  const employeeSadadatSum = employeeSadadat.reduce(
    (a, b) => a + b.EznValue,
    0
  );
  return employeeSadadatSum;
};

// this one to get all the qorood history needed for the table
const getQoroodHistory = async () => {
  const QardInfo = await getQardInfo();
  const qorodModel: QoroodHistoryModel[] = [];

  for (const qard of QardInfo) {
    const totalSadadat = await calculateTotalSadadat(qard.id);
    qorodModel.push({
      QardId: qard.id,
      PersonName: {
        PersonFirstName: qard.Person.PersonFirstName,
        PersonSecondName: qard.Person.PersonSecondName,
        PersonThirdName: qard.Person.PersonThirdName,
        PersonFourthName: qard.Person.PersonFourthName,
      },
      QardValue: qard.TotalQardValue,
      QardRequestDate: qard.QardRequestDate,
      Remaining: qard.TotalQardValue - totalSadadat,
    });
    console.log(qorodModel);
  }
  return qorodModel;
};

export default getQoroodHistory;
