import { NextApiRequest, NextApiResponse } from "next";
import { deletePureKhasm } from "../../../../controllers/khasmController";

// http://localhost:3000/api/HR_Endpoints/khasm/delete

const deleteKhasmEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const khasmId = req.body.id;
    const deletedKhasm = await deletePureKhasm(khasmId);
    res.status(200).json(deletedKhasm);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default deleteKhasmEndpoint;
