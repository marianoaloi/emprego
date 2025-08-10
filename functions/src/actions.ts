/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { jobCollection } from "./util/mongo";

const router = Router();

// GET /actions/appliedByMe
router.get("/appliedByMe", async (req: Request, res: Response) => {
  try {
    const undoObject: any = {};
    undoObject[req.query.undo ? "$unset" : "$set"] = { appliedByMe: new Date() };
    res.status(200).json(await jobCollection.updateOne({ "_id": req.query.id } as any, undoObject));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /actions/close
router.get("/close", async (req: Request, res: Response) => {
  try {
    const undoObject: any = {};
    undoObject["$set"] = { applyingInfo: { closed: !req.query.undo || true }, closedAt: new Date() };
    res.status(200).json(await jobCollection.updateOne({ "_id": req.query.id } as any, undoObject));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /actions/ignore
router.get("/ignore", async (req: Request, res: Response) => {
  try {
    const undoObject: any = {};
    undoObject[req.query.undo ? "$unset" : "$set"] = { ignore: new Date() };
    res.status(200).json(await jobCollection.updateOne({ "_id": req.query.id } as any, undoObject));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /actions/wait
router.get("/wait", async (req: Request, res: Response) => {
  try {
    const undoObject: any = {};
    undoObject[req.query.undo ? "$unset" : "$set"] = { wait: new Date() };
    res.status(200).json(await jobCollection.updateOne({ "_id": req.query.id } as any, undoObject));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;