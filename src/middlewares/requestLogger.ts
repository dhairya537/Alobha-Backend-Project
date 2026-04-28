import { pinoHttp } from "pino-http";
import logger from "../config/logger.js";
import crypto from "crypto";
import { Request, Response } from "express";

export const requestlogger = pinoHttp({
  logger,
  genReqId: () => crypto.randomUUID(),

  customLogLevel(req: Request, res: Response) {
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },

  serializers: {
    req(req: Request) {
      return {
        method: req.method,
        url: req.url,
        userAgent: req.headers["user-agent"],
        remoteAddress: req.socket?.remoteAddress,
      };
    },

    res(res: Response) {
      return {
        statusCode: res.statusCode,
      };
    },
  },

  customSuccessMessage(req: Request, res: Response) {
    return `${req.method} ${req.url} "success`;
  },

  customErrorMessage(req: Request, res: Response) {
    return `${req.method} ${req.url} "failed`;
  },
});
