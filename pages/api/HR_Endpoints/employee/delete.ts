import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/employee/delete?PersonCode=1

const deleteEmployee = async (req: NextApiRequest, res: NextApiResponse) => {
  const { PersonCode } = req.query;
  if (!PersonCode) {
    return res.status(400).send("id is required");
  }
  const deletedEmployee = await prisma.person.delete({
    where: {
      PersonCode: Number(PersonCode),
    },
  });
  res.status(200).send(deletedEmployee);
};

export default deleteEmployee;
