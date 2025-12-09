
import * as logger from "firebase-functions/logger";
import path from "path";


logger.info("Mongo Local! " + __dirname, { structuredData: true });

export const config = {
  mongodb: {
    url: "mongodb+srv://cluster0.7qska.mongodb.net/?"+
    "authSource=%24external&authMechanism=MONGODB-X509&"+
    "retryWrites=true&w=majority&appName=Cluster0",
    database: "linkedinjobs",
    databaseRAG: "RAG_CV",
    collection: "jobs",
    collectionLocalCode: "local_code",
    collectionsChucks: "cv_rag_chunks",
    certificatePath: path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")
  },
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development"
  },
  auth: {
    adminEmail: process.env.ADMIN_EMAIL || "mbr"
  }
};
