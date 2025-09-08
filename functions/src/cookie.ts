import { Router } from "express";
import { Db } from "mongodb";
import authenticate from "./util/firebaseAuth";
import { config } from "./util/env";



export default (db: Db) => {

    const router = Router();

    router.get("/", async (req, res) => {

        const user = await authenticate(req, res);
        if (!user) {
            return;
        }
        if (user.email !== config.auth.adminEmail) {
            throw new Error(`Only the admin (${config.auth.adminEmail}) can change the status. ${user.email}`);
        }

        res.status(200).json(db.collection("cookies").find({}).toArray());
    });

    router.post("/", async (req, res) => {
        const user = await authenticate(req, res);
        if (!user) {
            return;
        }
        if (user.email !== config.auth.adminEmail) {
            throw new Error(`Only the admin (${config.auth.adminEmail}) can change the status. ${user.email}`);
        }
        const body = req.body;
        if (!body.name || !body.value) {
            res.status(400).send("Missing name or value");
            return;
        }

        await db.collection(config.mongodb.collection)
            .updateMany({ _id: body._id as any }, { $unset: body });
        res.status(200).json({ message: "Opportunities updated" });
    });

    return router;
}