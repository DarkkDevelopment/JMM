import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const createAgazatRasmeya = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const nameOfNewAgaza = req.body.nameOfNewAgaza;
  const dateOfNewAgaza = req.body.dateOfNewAgaza;
  const newAgazat = await prisma.agazatRasmyaLookup.create({
    data: {
      AgazaRasmyaName: nameOfNewAgaza,
      AgazaRasmyaDate: dateOfNewAgaza,
    },
  });
  res.status(200).json(newAgazat);
};

export default createAgazatRasmeya;
