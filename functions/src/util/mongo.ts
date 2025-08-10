import {MongoClient, ServerApiVersion} from "mongodb";

import { config } from "./env";



const credentials = config.mongodb.certificatePath;

const client = new MongoClient(config.mongodb.url, {
  tlsCertificateKeyFile: credentials,
  serverApi: ServerApiVersion.v1,
});

const clientPromise = client.connect();
export default clientPromise;

