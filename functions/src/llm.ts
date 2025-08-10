/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { config } from "./util/env";
import { logger } from "firebase-functions";


export default (db: Db) => {

const router = Router();

// GET /llm/
router.get("/", async (req: Request, res: Response) => {
  try {
    const query = [
      {
        "$match": { llm: "" },
      },
    ];
    const data = await db.collection(config.mongodb.collection)
      .aggregate(query)
      .toArray();

    res.status(200).json(data);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

return router;
};

