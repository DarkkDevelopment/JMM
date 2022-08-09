import { NextApiRequest, NextApiResponse } from "next";
import { getAgazatRasmeya } from "../../../../controllers/VacationsController";

const AgazatRasmeyaEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const AgazatRasmeya = await getAgazatRasmeya();
    res.status(200).json(AgazatRasmeya);
  } catch (error: Error | any) {
    res.status(500).json({ error: error.message });
  }
};

export default AgazatRasmeyaEndpoint;
