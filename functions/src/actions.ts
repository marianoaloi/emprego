/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { config } from "./util/env";
import { logger } from "firebase-functions";


export default (db: Db) => {
  const router = Router();

  // GET /actions/appliedByMe
  router.get("/appliedByMe", async (req: Request, res: Response) => {
    try {
      const undoObject: any = {};
      undoObject[req.query.undo ? "$unset" : "$set"] = { appliedByMe: new Date() };
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET /actions/close
  router.get("/close", async (req: Request, res: Response) => {
    try {
      const undoObject: any = {};
      undoObject["$set"] = { applyingInfo: { closed: !req.query.undo || true }, closedAt: new Date() };
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET /actions/ignore
  router.get("/ignore", async (req: Request, res: Response) => {
    try {
      const undoObject: any = {};
      undoObject[req.query.undo ? "$unset" : "$set"] = { ignore: new Date() };
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET /actions/wait
  router.get("/wait", async (req: Request, res: Response) => {
    try {
      const undoObject: any = {};
      undoObject[req.query.undo ? "$unset" : "$set"] = { wait: new Date() };
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;

}