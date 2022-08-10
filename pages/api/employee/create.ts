import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { User } from "../../../models/userModel";

// http://localhost:3000/api/employee/create

const createEmployee = async (req: NextApiRequest, res: NextApiResponse) => {
  const u: User = req.body;

  const user = await prisma.person.create({
    data: {
      PersonCode: u.PersonCode,
      PersonFirstName: u.PersonFirstName,
      PersonSecondName: u.PersonSecondName,
      PersonThirdName: u.PersonThirdName,
      PersonFourthName: u.PersonFourthName,
      PersonRaqamQawmy: u.PersonRaqamQawmy,
      PersonRaqamTa2meeny: u.PersonRaqamTa2meeny,
      PersonTelephoneArdy: u.PersonTelephoneArdy,
      PersonTaree5Milad: u.PersonTaree5Milad,
      PersonTaree5Ta3yeen: u.PersonTaree5Ta3yeen,
      PersonSanawatTa2meen: u.PersonSanawatTa2meen,
      PersonDyanaId: u.PersonDyana,
      PersonTypeId: u.PersonType,
      PersonTa2meenValue: u.PersonTa2meenValue,
      deletedAt: u.deletedAt,
    },
  });

  const userAddress = await prisma.personAddress.create({
    data: {
      PersonCode: u.PersonCode,
      PersonAddress: u.PersonAddress,
      PersonManteqaID: u.PersonManteqaID,
      PersonMohafzaID: u.PersonMohafzaID,
    },
  });

  /*  const userPassword = await prisma.personPassword.create({
    data: {
      PersonCode: u.PersonCode,
      PersonSystemPassword: u.PersonSystemPassword,
    },
  });
 */

  const userAgazaLimits = await prisma.personAgazaLimit.create({
    data: {
      PersonCode: u.PersonCode,
      NumberOfAgazaDays: u.NumberOfAgazaDays,
      Year: new Date().getFullYear(),
    },
  });

  const userDocuments = await prisma.personDocuments.create({
    data: {
      PersonCode: u.PersonCode,
      Beta2aWesh: u.Beta2aWesh,
      Beta2aDahr: u.Beta2aDahr,
      Feesh: u.Feesh,
      ShehadetMilad: u.ShehadetMilad,
      ShehadetGeish: u.ShehadetGeish,
      PersonContract: u.PersonContract,
    },
  });

  const userCurrentMorattab =
    await prisma.personCurrentMorattabAndDarayebPercentage.create({
      data: {
        PersonCode: u.PersonCode,
        CurrentMorattab: u.CurrentMorattab,
        PersonMorattabDareebaPercentage: 0.25,
      },
    });

  const userMobileNumbers = await prisma.personMobileNumbers.create({
    data: {
      PersonCode: u.PersonCode,
      MobileNumber: u.MobileNumber,
    },
  });

  const userWazefa = await prisma.personWazeefa.create({
    data: {
      PersonCode: u.PersonCode,
      PersonWazeefaId: u.PersonWazeefa,
    },
  });

  if (
    user &&
    userAddress &&
    // userPassword &&
    userDocuments &&
    userCurrentMorattab &&
    userMobileNumbers &&
    userWazefa &&
    userAgazaLimits
  ) {
    res.status(200).json({
      message: "Employee created successfully",
      user,
      userAddress,
      // userPassword,
      userDocuments,
      userCurrentMorattab,
      userMobileNumbers,
      userWazefa,
      userAgazaLimits,
    });
  } else {
    res.status(500).json({
      message: "Error creating employee",
    });
  }
};

export default createEmployee;
