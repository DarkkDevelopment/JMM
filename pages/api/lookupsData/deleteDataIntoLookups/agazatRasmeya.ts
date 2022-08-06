import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/agazatRasmeya

const deleteAgazaRasmeya = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.body.id;
  const deletedAgaza = await prisma.agazatRasmyaLookup.delete({
    where: {
      AgazaRasmyaID: id,
    },
  });
  res.status(200).json(deletedAgaza);
};

export default deleteAgazaRasmeya;
