/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import * as logger from "firebase-functions/logger";

import cors from "cors";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import express, { Request, Response } from "express";
import actionsRouter from "./actions";
import dashboardRouter from "./dashboard";
import dataRouter from "./data";
import llmRouter from "./llm";
import skillRouter from "./skill";
import textRouter from "./text";
import cookieRooter from "./cookie";
import { config } from "./util/env";
const app = express();

// List of allowed origins
const allowedOrigins = [
  "https://emprego-4bb54.web.app",
  "https://emprego-4bb54.firebaseapp.com",
  "https://emprego.aloi.com.br",
];

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      if (origin.includes("localhost")
        ||
        origin.includes("127.0.0.1")
        ||
        origin.match(/https:\/\/emprego.+/)) {
        allowedOrigins.push(origin);
        return callback(null, true);

      } else {
        return callback(new Error("Not allowed by CORS "+origin));
      }
    }
  },
  credentials: true, // if you need to send cookies or auth headers
};

// Use CORS with options
app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());


async function connectToMongoDB() {
  try {

    const client = await clientPromise
    logger.log("Connected to MongoDB successfully");

    // Test the connection
    const db = client.db(config.mongodb.database);
    await db.admin().ping();
    logger.log("Database ping successful");


    app.get("/", (req: Request, res: Response) => {
      logger.info("Hello logs!", { structuredData: true });
      res.send("Hello World!");
    });


    app.use("/actions", actionsRouter(db));
    app.use("/dashboard", dashboardRouter(db));
    app.use("/data", dataRouter(db));
    app.use("/llm", llmRouter(db));
    app.use("/skill", skillRouter(db));
    app.use("/text", textRouter(db));
    app.use("/cookie", cookieRooter(db));
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);
    process.exit(1);;
  }
}





import { onRequest } from "firebase-functions/v2/https";
import clientPromise from "./util/mongo";
import { generateCv } from "./cv/cvCreator";
const PORT = config.server.port;
async function startServer() {
  await connectToMongoDB();


  app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);

  });
}
try {

  exports.api = onRequest(app);
} catch (error) {
  logger.error("General error in server", error)
}


startServer().catch(logger.error);
exports.generateCv = generateCv
import { generateLetteraPresentacione } from "./cv/generateLetteraPresentacione";
exports.generateLetteraPresentacione = generateLetteraPresentacione