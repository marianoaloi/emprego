import {MongoClient, ServerApiVersion} from "mongodb";


import * as logger from "firebase-functions/logger";
import { config } from "./env";
// const client = new MongoClient(process.env.MONGO_ARC || "")


logger.info("Mongo Local! "+__dirname, {structuredData: true});

const credentials = config.mongodb.certificatePath;

// new mongoDB.MongoClient(process.env.MONGO_ARC || "")
const client = new MongoClient(config.mongodb.url, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
});

const clientPromise = client.connect();
export default clientPromise;
export const jobCollection = client.db(config.mongodb.database).collection(config.mongodb.collection);
// export const
