import { NextApiRequest, NextApiResponse } from "next";
import { deletePureHafez } from "../../../../controllers/hawafezController";

// http://localhost:3000/api/HR_Endpoints/hawafez/delete

const deleteHawafezEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const hafezId = req.body.id;
    const deletedPureHafez = await deletePureHafez(hafezId);
    res.status(200).json(deletedPureHafez);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default deleteHawafezEndpoint;
