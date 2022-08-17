import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/employee/getDeletedEmployees

const deletedEmployeesEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const AllEmployees = await prisma.person.findMany({
      where: {
        NOT: {
          deletedAt: null,
        },
      },
    });
    res.status(200).json(AllEmployees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deletedEmployeesEndpoint;
