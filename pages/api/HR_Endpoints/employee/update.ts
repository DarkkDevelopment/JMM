import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { User } from "../../../../models/userModel";

// http://localhost:3000/api/employee/update

const updateEmployee = async (req: NextApiRequest, res: NextApiResponse) => {
  const u: User = req.body;

  const updatedGeneralInfo = await prisma.person.update({
    where: {
      PersonCode: u.PersonCode,
    },
    data: {
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
    },
  });

  const updatedAddress = await prisma.personAddress.update({
    where: {
      PersonCode: u.PersonCode,
    },
    data: {
      PersonAddress: u.PersonAddress,
      PersonManteqaID: u.PersonManteqaID,
      PersonMohafzaID: u.PersonMohafzaID,
    },
  });

  // const updateDocuments = await prisma.personDocuments.update({
  //   where: {
  //     PersonCode: u.PersonCode,
  //   },
  //   data: {
  //     Beta2aWesh: u.Beta2aWesh,
  //     Beta2aDahr: u.Beta2aDahr,
  //     Feesh: u.Feesh,
  //     ShehadetMilad: u.ShehadetMilad,
  //     ShehadetGeish: u.ShehadetGeish,
  //     PersonContract: u.PersonContract,
  //   },
  // });

  const updateMoratab =
    await prisma.personCurrentMorattabAndDarayebPercentage.update({
      where: {
        PersonCode: u.PersonCode,
      },
      data: {
        CurrentMorattab: u.CurrentMorattab,
        PersonMorattabDareebaPercentage: u.PersonMorattabDareebaPercentage,
      },
    });

  const updateMobileNumbers = await prisma.personMobileNumbers.update({
    where: {
      PersonCode: u.PersonCode,
    },
    data: {
      MobileNumber: u.MobileNumber,
    },
  });

  const updatePersonWazefa = await prisma.personWazeefa.update({
    where: {
      PersonCode: u.PersonCode,
    },
    data: {
      PersonWazeefaId: u.PersonWazeefa,
    },
  });

  if (
    updatedGeneralInfo &&
    updatedAddress &&
    // updateDocuments &&
    updateMoratab &&
    updateMobileNumbers &&
    updatePersonWazefa
  ) {
    res.status(200).json({
      message: "Employee updated successfully",
      updatedGeneralInfo,
      updatedAddress,
      // updateDocuments,
      updateMoratab,
      updateMobileNumbers,
      updatePersonWazefa,
    });
  } else {
    res.status(500).json({
      message: "Error updating employee",
    });
  }
};

export default updateEmployee;
