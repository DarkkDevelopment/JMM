import { NextApiRequest, NextApiResponse } from "next";
import {
  createHafezExtraDays,
  createHafezExtraHours,
  createHafezPure,
} from "../../../../controllers/hawafezController";
import { HawafezModel } from "../../../../models/hawafezModel";

// http://localhost:3000/api/hawafez/create?type=

const createHafez = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { type } = req.query;
    if (type === "pureHafez") {
      const pureModel = req.body as HawafezModel;
      const hafez = await createHafezPure(req, res, pureModel);
      res.status(200).json({
        message: "success",
        data: hafez,
      });
    } else if (type === "extraHours") {
      const ExtraHoursModel = req.body as HawafezModel;
      const newHafez = await createHafezExtraHours(ExtraHoursModel);
      res.status(200).json({
        message: "success",
        data: newHafez,
      });
    } else if (type === "extraDays") {
      const ExtraDaysModel = req.body as HawafezModel;
      const newHafez = await createHafezExtraDays(ExtraDaysModel);
      res.status(200).json({
        message: "success",
        data: newHafez,
      });
    } else {
      res.status(400).json({ error: "type is not valid" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createHafez;
