import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/employee/getEmployee?PersonCode=1

const getEmployee = async (req: NextApiRequest, res: NextApiResponse) => {
  const { PersonCode } = req.query;
  if (!PersonCode) {
    return res.status(400).send("id is required");
  }
  const employeeGeneralInfo = await prisma.person.findUnique({
    where: {
      PersonCode: Number(PersonCode),
    },
  });
  const employeeAddress = await prisma.personAddress.findUnique({
    where: {
      PersonCode: Number(PersonCode),
    },
    include: {
      ManteqaLookup: {
        select: {
          ManteqaName: true,
        },
      },
      MohafzatLookup: {
        select: {
          MohafzaName: true,
        },
      },
    },
  });
  const employeeDocuments = await prisma.personDocuments.findUnique({
    where: {
      PersonCode: Number(PersonCode),
    },
  });
  const employeeMoratab =
    await prisma.personCurrentMorattabAndDarayebPercentage.findUnique({
      where: {
        PersonCode: Number(PersonCode),
      },
    });
  const employeeMobile = await prisma.personMobileNumbers.findUnique({
    where: {
      PersonCode: Number(PersonCode),
    },
  });

  const employeeWazeefa = await prisma.personWazeefa.findUnique({
    where: {
      PersonCode: Number(PersonCode),
    },
    include: {
      PersonWazeefa: {
        select: {
          WazeefaName: true,
        },
      },
    },
  });

  if (
    employeeGeneralInfo &&
    employeeAddress &&
    employeeMoratab &&
    employeeMobile &&
    employeeWazeefa
  ) {
    return res.status(200).send({
      employeeGeneralInfo,
      employeeAddress,
      employeeDocuments,
      employeeMoratab,
      employeeMobile,
      employeeWazeefa,
    });
  } else {
    return res.status(404).send("employee not found");
  }
};

export default getEmployee;
