
import { Collection, Db } from "mongodb";
import { config } from "../util/env";
import clientPromise from "../util/mongo";
import * as functions from "firebase-functions";

interface CvConnection {
    db: Db;
    jobs:  Collection;
    chunks: Collection;
}

var dbSigleton : CvConnection | null = null;

export default async function getCollections() : Promise<CvConnection>  {
    if (dbSigleton) return dbSigleton;


    const client = await clientPromise;
    const db = client.db(config.mongodb.database);
    const dbChunks = client.db(config.mongodb.databaseRAG);
    await db.admin().ping();
    functions.logger.log("Database ping successful");
    return dbSigleton = {
        db:db,
        jobs:db.collection(config.mongodb.collection),
        chunks:dbChunks.collection(config.mongodb.collectionsChucks)
    };

}