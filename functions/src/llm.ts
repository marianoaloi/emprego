/* eslint-disable import/no-anonymous-default-export */
// pages/api/llm.js
import {Request, Response} from "express";
import { jobCollection } from "./util/mongo";

export default async (req: Request, res: Response) => {
  try {

    const query = [
      {
        "$match": {llm: ""},
      },
    ];
    const data = await jobCollection
      .aggregate(
        query
      ).toArray();

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Internal Server Error"});
  }
};
