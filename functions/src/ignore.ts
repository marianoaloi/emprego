/* eslint-disable import/no-anonymous-default-export */
import {Request, Response} from "express";
import { jobCollection } from "./util/mongo";

export default async (req: Request, res: Response) => {
  try {
    const undoObject : any = {};
    undoObject[req.query.undo ? "$unset" : "$set"] = {ignore: new Date()};
    res.status(200).json(jobCollection.updateOne({"_id": req.query.id} as any, undoObject));
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Internal Server Error"});
  }
};
