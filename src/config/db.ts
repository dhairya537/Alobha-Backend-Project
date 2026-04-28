import mongoose from "mongoose";
import { env } from "./env.js";
import logger from "./logger.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("mongoDB is connected to the server");
  } catch (error) {
    logger.error(error, "mongoDB is not connected to server");
  }
};
