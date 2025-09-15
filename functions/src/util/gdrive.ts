import { google } from "googleapis";

import * as fs from "fs";

// const cred = require('./cert/curriculum-29102-9e559bc27c95.json')
const cred = JSON.parse(fs.readFileSync('./cert/curriculum-29102-30136a87238b.json', 'utf8'));


const authDrive = new google.auth.GoogleAuth({
  credentials: cred,
  scopes: ['https://www.googleapis.com/auth/drive.readonly']
});

export const drive = google.drive({ version: 'v3', auth: authDrive });