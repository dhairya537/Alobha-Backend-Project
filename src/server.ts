import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";
const startServer = async function () {
  try {
    await connectDb();
    app.listen(env.PORT, () => {
      console.log(`server is started on ${env.PORT}`);
    });
  } catch (error) {
    logger.error("server is not started something went wrong");
    process.exit(1);
  }
};

startServer();
