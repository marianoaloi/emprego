/* eslint-disable import/no-anonymous-default-export */


import {Request, Response} from "express";
import clientPromise from "./util/mongo";

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db("linkedinjobs");

    const data = await db.collection("jobsClean")
      .find({_id: {$in: req.body}}).project({
        "_id": 1,
        "applicantSkillsMatchStatuses": 1,
      });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Internal Server Error"});
  }
};
