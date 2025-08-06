/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import cors from "cors";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import express, {Request, Response} from "express";
import appliedByMe from "./appliedByMe";
import close from "./close";
import dashboard from "./dashboard";
import data from "./data";
import ignore from "./ignore";
import llm from "./llm";
import skill from "./skill";
import text from "./text";
import wait from "./wait";
import { config } from "./util/env";
const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://emprego-4bb54.web.app",
  "https://emprego-4bb54.firebaseapp.com",
  "https://emprego.aloi.com.br",
  "http://localhost:3000"
];

// CORS configuration
const corsOptions = {
  origin: function(origin: string | undefined, callback: any) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS "+origin));
    }
  },
  credentials: true, // if you need to send cookies or auth headers
};

// Use CORS with options
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  logger.info("Hello logs!", {structuredData: true});
  res.send("Hello World!");
});


app.get("/appliedByMe", (req:Request, res:Response) => {
  appliedByMe(req, res);
});
app.get("/close", (req:Request, res:Response) => {
  close(req, res);
});
app.post("/dashboard", (req:Request, res:Response) => {
  dashboard(req, res);
});
app.post("/data", (req:Request, res:Response) => {
  data(req, res);
});
app.get("/ignore", (req:Request, res:Response) => {
  ignore(req, res);
});
app.get("/llm", (req:Request, res:Response) => {
  llm(req, res);
});
app.post("/skill", (req:Request, res:Response) => {
  skill(req, res);
});
app.post("/text", (req:Request, res:Response) => {
  text(req, res);
});
app.get("/wait", (req:Request, res:Response) => {
  wait(req, res);
});


exports.api = onRequest(app);

const PORT = config.server.port;

    app.listen(PORT, () => {
        logger.log(`Server is running on port ${PORT}`);
        
    });