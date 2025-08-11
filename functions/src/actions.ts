/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { config } from "./util/env";
import { logger } from "firebase-functions";
import authenticate from "./util/firebaseAuth";


export default (db: Db) => {
  const router = Router();

  // GET /actions/appliedByMe
  router.get("/appliedByMe", async (req: Request, res: Response) => {
    const user = await authenticate(req, res);
    if (!user) {
      return;
    }
    try {
      const undoObject: any = {};
      const undo = req.query.undo
      undoObject[undo ? "$unset" : "$set"] = { appliedByMe: new Date() };
      if (undo) {
        undoObject["$set"] = {}
      }
      undoObject["$set"].user = user.email ;
      if (user.email !== config.auth.adminEmail) {
        throw new Error("Only the admin can change the status.");
      }
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET /actions/close
  router.get("/close", async (req: Request, res: Response) => {
    const user = await authenticate(req, res);
    if (!user) {
      return;
    }
    try {
      const undoObject: any = {};   
      const undo = req.query.undo
      undoObject["$set"] = { applyingInfo: { closed: !req.query.undo || true }, closedAt: !req.query.undo ? new Date() : null };
      if (undo) {
        undoObject["$set"] = {}
      }
      undoObject["$set"].user = user.email ;


      if (user.email !== config.auth.adminEmail) {
        throw new Error("Only the admin can change the status.");
      }
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET /actions/ignore
  router.get("/ignore", async (req: Request, res: Response) => {
    const user = await authenticate(req, res);
    if (!user) {
      return;
    }
    try {
      const undoObject: any = {};
      const undo = req.query.undo
      undoObject[undo ? "$unset" : "$set"] = { ignore: new Date() };
      if (undo) {
        undoObject["$set"] = {}
      }
      undoObject["$set"].user = user.email ;

      if (user.email !== config.auth.adminEmail) {
        throw new Error("Only the admin can change the status.");
      }
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // GET /actions/wait
  router.get("/wait", async (req: Request, res: Response) => {
    const user = await authenticate(req, res);
    if (!user) {
      return;
    }
    try {
      const undoObject: any = {};
      const undo = req.query.undo
      undoObject[undo ? "$unset" : "$set"] = { wait: new Date() };

      
      if (undo) {
        undoObject["$set"] = {}
      }
      undoObject["$set"].user = user.email ;
      if (user.email !== config.auth.adminEmail) {
        throw new Error("Only the admin can change the status.");
      }
      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;

}