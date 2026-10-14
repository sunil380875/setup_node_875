import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Express } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupRoutes = async (app: Express): Promise<void> => {
  const routesPath = __dirname;

  if (fs.existsSync(routesPath)) {
    const files = fs
      .readdirSync(routesPath)
      .filter((file) => file.endsWith(".router.ts"));
    
    for (const file of files) {
      const fullPath = path.join(routesPath, file);
      const routeModule = await import(pathToFileURL(fullPath).href);
      const routeName = file.replace(".router.ts", "");
      console.log(routeName)
      app.use(`/api/v1/${routeName}`, routeModule.default);
    }
  }
};

export default setupRoutes;
