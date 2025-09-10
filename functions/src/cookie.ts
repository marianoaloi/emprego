import { Router } from "express";
import { Db } from "mongodb";
import authenticate from "./util/firebaseAuth";
import { config } from "./util/env";
import { projectData } from "./data";



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

        res.status(200).json(await db.collection("cookies").find({}).toArray());
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
            .updateMany({ _id: body.jobPostingId as any }, { $set: body });
        res.status(200).json({ message: "Opportunities updated" });
    });

    router.get('/update', async (req, res) => {
        const user = await authenticate(req, res);
        if (!user) {
            return;
        }
        if (user.email !== config.auth.adminEmail) {
            throw new Error(`Only the admin (${config.auth.adminEmail}) can change the status. ${user.email}`);
        }

        const cookies = (await db.collection("cookies").find({}).project({ _id: 1, value: 1 }).toArray()).map(c => `${c._id}=${c.value}`).join('; ');
        const reqDataSecureToken = (await db.collection("cookies").findOne({ _id: "JSESSIONID" as any }))?.value || '';

        const result = await fetch(`https://www.linkedin.com/voyager/api/jobs/jobPostings/${req.query.id}?decorationId=com.linkedin.voyager.deco.jobs.web.shared.WebFullJobPosting-65&topN=1&topNRequestedFlavors=List(TOP_APPLICANT,IN_NETWORK,COMPANY_RECRUIT,SCHOOL_RECRUIT,HIDDEN_GEM,ACTIVELY_HIRING_COMPANY)`, {
            "headers": {
                "csrf-token": reqDataSecureToken.replaceAll('"', ''),
                "accept": "*/*",
                "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": cookies,
                "Referer": "https://www.linkedin.com/messaging/"
            },
            "body": null,
            "method": "GET"
        }).then(response => response.json())
            .catch(error => {
                console.error('Error fetching cookies:', error);
            });


        await db.collection(config.mongodb.collection)
            .updateMany({ _id: result.jobPostingId.toString() }, { $set: sanitizeFields(result) });

        const findOne = await db.collection(config.mongodb.collection)
            .findOne({ _id: result.jobPostingId.toString() }, { projection: projectData })
        res.status(200).json(findOne);
    });

    return router;
}

const reDot = /\./gi;
function sanitizeFields(obj: any, deepth = 0) {
    const sanitizedObj: any = {};
    for (const key in obj) {
        if (deepth >= 9) {
            return undefined
        }
        if (obj.hasOwnProperty(key) && !key.startsWith('$')) {
            sanitizedObj[key.replace(reDot, '')] = obj[key] instanceof Object ? sanitizeFields(obj[key], deepth + 1) : obj[key];
        }
    }
    return sanitizedObj;
}