import { NextApiRequest, NextApiResponse } from "next";
import {
  createKhasmGheyabDays,
  createKhasmLateHours,
  createPureKhasm,
} from "../../../../controllers/khasmController";
import { KhasmModel } from "../../../../models/khasmModel";

// http://localhost:3000/api/khasm/create?type=

const createKhasm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { type } = req.query;
    if (type === "pureKhasm") {
      const pureModel = req.body as KhasmModel;
      const newKhasm = await createPureKhasm(req, res, pureModel);
      res.status(200).json({
        message: "success",
        data: newKhasm,
      });
    } else if (type === "LateHours") {
      const LateHoursModel = req.body as KhasmModel;
      const newKhasm = await createKhasmLateHours(LateHoursModel);
      res.status(200).json({
        message: "success",
        data: newKhasm,
      });
    } else if (type === "GheyabDays") {
      const GheyabDaysModel = req.body as KhasmModel;
      console.log(GheyabDaysModel);
      const newKhasm = await createKhasmGheyabDays(req, res, GheyabDaysModel);
      res.status(200).json({
        message: "success",
        data: newKhasm,
      });
    } else {
      res.status(400).json({ error: "type is not valid" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createKhasm;
