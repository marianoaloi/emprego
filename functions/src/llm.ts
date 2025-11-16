/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { logger } from "firebase-functions";
import {getSearchChuck} from "./util/getJsonCurriculum";


export default (db: Db) => {

  const router = Router();
  getSearchChuckService(db, router);
  return router;
};


async function getSearchChuckService(db: Db, router: Router) {
  // GET /llm/
  router.get("/", async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        res.status(400).json({ message: "Body is required" });
        return;
      }
      const { query } = req.body
      if (!query) {
        res.status(400).json({ message: "Query parameter is required" });
        return;
      }

      const data = await getSearchChuck(query)

      res.status(200).json(data);
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}

