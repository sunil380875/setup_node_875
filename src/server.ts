import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || process.env.port || 4000;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(port, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV || "development"} mode at http://127.0.0.1:${port}`
    );
  });
};

startServer();
