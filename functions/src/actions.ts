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

    setParameter(req, { appliedByMe: new Date() }, res);
  })

  // GET /actions/close
  router.get("/close", async (req: Request, res: Response) => {

    const undo = req.query.undo
    setParameter(req, { applyingInfo: { closed: !undo || true }, closedAt: !undo ? new Date() : null }, res);
  })

  // GET /actions/ignore
  router.get("/ignore", async (req: Request, res: Response) => {

    setParameter(req, { ignore: new Date() }, res);
  })

  // GET /actions/wait
  router.get("/wait", async (req: Request, res: Response) => {

    setParameter(req, { wait: new Date() }, res);
  })
  return router;



  async function setParameter(req: Request, objSet: any, res: Response) {
    const user = await authenticate(req, res);
    if (!user) {
      return;
    }
    if (user.email !== config.auth.adminEmail) {
      throw new Error(`Only the admin (${config.auth.adminEmail}) can change the status. ${user.email}`);
    }
    try {
      const undoObject: any = {};
      const undo = req.query.undo
      if (!objSet["applyInfo"]) {
        undoObject[undo ? "$unset" : "$set"] = objSet;
        if (undo) {
          undoObject["$set"] = {}
        }
      }else{
        undoObject["$set"] = objSet;
      }
      undoObject["$set"].user = user.email;

      res.status(200).json(await db.collection(config.mongodb.collection).updateOne({ "_id": req.query.id } as any, undoObject));
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }

  }

}