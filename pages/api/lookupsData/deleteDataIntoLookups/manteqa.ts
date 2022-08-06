import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/manteqa

const deleteManteqa = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id;
  const deletedManteqa = await prisma.manteqaLookup.delete({
    where: {
      ManteqaID: id,
    },
  });
  res.status(200).json(deletedManteqa);
};

export default deleteManteqa;
