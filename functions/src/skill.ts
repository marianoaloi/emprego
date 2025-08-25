/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { logger } from "firebase-functions";

import { Db } from "mongodb";


export default (db: Db) => {

  const router = Router();

  // POST /skill/
  router.post("/", async (req: Request, res: Response) => {
    try {
      const query = { _id: { $in: req.body } }
      const data = await db.collection("skils")
        .find(query).project({
          match: {
            $map: {
              as: "match",
              input: { $objectToArray: "$skillMatchStatuses" },
              in: {
                skillOnProfile: "$$match.v.skillOnProfile",
                localizedSkillDisplayName: "$$match.v.localizedSkillDisplayName",
                skillMatchActionButton: "$$match.v.skillMatchActionButton.actionUrl",
              }
            }
          },
          text: "$insightSummary.text.text"
        }).toArray();

      res.status(200).json(data);
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
};


