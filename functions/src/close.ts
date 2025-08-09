/* eslint-disable import/no-anonymous-default-export */
import {Request, Response} from "express";
import { jobCollection } from "./util/mongo";

export default async (req: Request, res: Response) => {
  try {
    const undoObject : any = {};
    undoObject["$set"] = {applyingInfo: {closed: !req.query.undo || true}, closedAt: new Date()};
    res.status(200).json(await jobCollection.updateOne({"_id": req.query.id} as any, undoObject));
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Internal Server Error"});
  }
};
