import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/HR_Endpoints/employee/reAssignByCode

const reAssignEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const code = req.body.code;
    const updateEmployee = await prisma.person.update({
      where: {
        PersonCode: code,
      },
      data: {
        deletedAt: null,
      },
    });
    res.status(200).json(updateEmployee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default reAssignEndpoint;
