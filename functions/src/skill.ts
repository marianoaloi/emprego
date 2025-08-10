/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { logger } from "firebase-functions";

import { Db } from "mongodb";


export default (db: Db) => {

  const router = Router();

  // POST /skill/
  router.post("/", async (req: Request, res: Response) => {
    try {
      const data = db.collection("jobsClean")
        .find({ _id: { $in: req.body } }).project({
          "_id": 1,
          "applicantSkillsMatchStatuses": 1,
        });

      res.status(200).json(data);
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
};


