import pino from "pino";
import { env } from "./env.js";

const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.body.token",
      "req.body.password",
    ],
    remove: true,
  },
  transport:
    env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS : standard",
          },
        }
      : undefined,
});

export default logger;
