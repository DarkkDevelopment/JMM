import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/agazatRasmeya

const updateAgazatRasmeya = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const nameOfNewAgaza = req.body.nameOfNewAgaza;
  const dateOfNewAgaza = req.body.dateOfNewAgaza;
  const idOfNewAgaza = req.body.idOfNewAgaza;
  const newAgazat = await prisma.agazatRasmyaLookup.update({
    where: {
      AgazaRasmyaID: idOfNewAgaza,
    },
    data: {
      AgazaRasmyaName: nameOfNewAgaza,
      AgazaRasmyaDate: dateOfNewAgaza,
    },
  });
  res.status(200).json(newAgazat);
};

export default updateAgazatRasmeya;
