import cors from "cors";
import helmet from "helmet";
import type { Express } from "express";

export const setupSecurity = (app: Express): void => {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
};

export default setupSecurity;
