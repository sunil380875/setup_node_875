import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";

import { setupSecurity } from "./config/security.js";
import { setupRoutes } from "./routes/index.js";

// Load Environment Variables
const currentEnv = process.env.NODE_ENV || "development";
const envFilePath = path.resolve(process.cwd(), `.env.${currentEnv}`);

if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  dotenv.config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSecurity(app);


await setupRoutes(app);

export default app;
