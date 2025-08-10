/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { config } from "./util/env";
import { logger } from "firebase-functions";


export default (db: Db) => {

  const router = Router();

  // POST /text/
  router.post("/", async (req: Request, res: Response) => {
    try {
      const query = [
        {
          "$match": {
            "_id": {
              "$in": req.body.ids,
            },
          },
        }, {
          "$project": {
            "_id": 1,
            "text": "$description.text",
            "attributes": "$description.attributes",
          },
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


