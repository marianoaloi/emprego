import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

import cors from "cors";

import prompt from "./prompt";
import { drive } from "../util/gdrive";

configDotenv();


if (admin.apps.length === 0) {
  admin.initializeApp({ projectId: process.env.PROJECT_ID });
}



// import { defineSecret } from "firebase-functions/params";
// logger.log(defineSecret("GEMINI_API").value())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "ERROR+API");

// Configure CORS for allowed origins
const corsHandler = cors({
  origin: [
    'https://emprego-4bb54.web.app',
    'https://emprego-4bb54.firebaseapp.com',
    'https://emprego.aloi.com.br',
    'http://localhost:3000',  // For local development
    'https://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

export const generateCv = functions
  .https.onRequest({
    timeoutSeconds: 540
  }, async (req, res) => {
    // Handle CORS
    return corsHandler(req, res, async () => {
      // Handle preflight OPTIONS request
      if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
      }

      // Only allow POST requests for the actual function
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      try {
        const data = req.body;

        // Verify authentication
        if (!data || !data.data || !data.data.authToken) {
          functions.logger.warn("Unauthenticated request to generateCv");
          res.status(401).json({
            error: 'unauthenticated',
            message: 'User must be authenticated to generate CV.'
          });
          functions.logger.error('User must be authenticated to generate CV.')
          return;
        }

        const { authToken } = data.data;

        // Additional token verification if needed
        try {
          if (authToken) {
            const decodedToken = await admin.auth().verifyIdToken(authToken);
            if (decodedToken.email !== process.env.OWNER_EMAIL) {
              res.status(401).json({
                error: 'unauthenticated',
                message: 'Only Maloi authenticated to generate CV.'
              });
              functions.logger.error('Only Maloi authenticated to generate CV.')
              return;
            }
            const uid = decodedToken.uid;

            functions.logger.info(`CV generation request from user: ${uid}`);
          }
        } catch (error) {
          functions.logger.error("Invalid auth token:", error);
          res.status(401).json({
            error: 'unauthenticated',
            message: 'Invalid authentication token.'
          });
          functions.logger.error('Invalid authentication token.')
          return;
        }

        const resp = await drive.files.get({
          fileId: process.env.FILE_ID || "ERROR+API",
          alt: 'media'
        })

        const rdata = typeof (resp.data) === 'string' ? JSON.parse(resp.data) : resp.data;

        if (!rdata) {
          res.status(500).json({
            error: 'data-loss',
            message: 'Not get the RAG file in Drive'
          });
          functions.logger.error('Not get the RAG file in Drive')
          return;
        }

        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash-lite",
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 30_000,
          }
        });

        const result = await model.generateContent(prompt(rdata, data.data));
        const response = result.response;
        const text = response.text()
          .replace("```json", "")
          .replace("```", "")
          .replaceAll(/\*\*([^*]+)\*\*/gi, "<b>$1</b>");

        try {
          const jsonDoc = await JSON.parse(text);

          // // Convert markdown to HTML in text fields
          // if (jsonDoc.summary) {
          //   jsonDoc.summary = await marked(jsonDoc.summary);
          // }else{
          //   functions.logger.error("Error parsing JSON from Gemini API Text:", text);
          //   functions.logger.error("Error parsing JSON from Gemini API JSON:", JSON.stringify(jsonDoc));
          // }

          // // Convert markdown to HTML in experience descriptions
          // if (jsonDoc.experience && Array.isArray(jsonDoc.experience)) {
          //   for (const exp of jsonDoc.experience) {
          //     if (exp.description) {
          //       exp.description = await marked(exp.description);
          //     }
          //   }
          // }

          // // Convert markdown to HTML in project descriptions
          // if (jsonDoc.interistingProjects && Array.isArray(jsonDoc.interistingProjects)) {
          //   for (const project of jsonDoc.interistingProjects) {
          //     if (project.description) {
          //       project.description = await marked(project.description);
          //     }
          //   }
          // }

          jsonDoc["certificates"] = rdata["certificates"]
          jsonDoc["educations"] = rdata["educations"]

          if (!jsonDoc.languageCodeOfJobDescription) {
            jsonDoc.languageCodeOfJobDescription = data.data.lang
          }

          res.status(200).json({ data: jsonDoc });
        } catch (e : any) {
          functions.logger.error("Error parsing JSON from Gemini API:", text);
          res.status(500).json({
            error: 'internal',
            message: 'Failed to parse CV data from AI service. '+e.toString()
          });
          functions.logger.error('Failed to parse CV data from AI service. '+e.toString())
        }
      } catch (error) {
        functions.logger.error("Unexpected error in generateCv:", error);
        res.status(500).json({
          error: 'internal',
          message: 'An unexpected error occurred.'
        });
        functions.logger.error('An unexpected error occurred.')
      }
    });
  });
