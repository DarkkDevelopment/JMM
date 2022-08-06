import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/deleteDataIntoLookups/wazayefLookup

const deleteWazayef = async (req: NextApiRequest, res: NextApiResponse) => {
  const wazeefaId = req.body.wazeefaId;
  const updatedWazeefa = await prisma.wazayefTypesLookup.delete({
    where: {
      WazeefaID: wazeefaId,
    },
  });
  res.status(200).json(updatedWazeefa);
};

export default deleteWazayef;
