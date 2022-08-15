import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// this Endpoint responsible for the table in the Employees Page

// http://localhost:3000/api/employee/getAll

const getAllEmployees = async (req: NextApiRequest, res: NextApiResponse) => {
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
      PersonDyana: true,
      PersonWazeefa: {
        select: {
          PersonWazeefa: {
            select: {
              WazeefaName: true,
            },
          },
        },
      },
    },
    orderBy: {
      PersonCode: "asc",
    },
  });
  if (employees) {
    return res.status(200).send(employees);
  } else {
    return res.status(400).send("No employees found");
  }
};

export default getAllEmployees;
