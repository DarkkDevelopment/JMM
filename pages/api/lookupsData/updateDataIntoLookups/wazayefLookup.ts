import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

// http://localhost:3000/api/lookupsData/updateDataIntoLookups/wazayefLookup

const updateWazayef = async (req: NextApiRequest, res: NextApiResponse) => {
  const newWazeefaName = req.body.wazeefaName;
  const newWazeefaDescription = req.body.wazeefaDescription;
  const wazeefaId = req.body.wazeefaId;

  const updatedWazeefa = await prisma.wazayefTypesLookup.update({
    where: {
      WazeefaID: wazeefaId,
    },
    data: {
      WazeefaName: newWazeefaName,
      WazeefaDescription: newWazeefaDescription,
    },
  });
  res.status(200).json(updatedWazeefa);
};

export default updateWazayef;
