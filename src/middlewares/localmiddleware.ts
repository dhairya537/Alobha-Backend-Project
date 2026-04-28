import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.js";

export const localmiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info("middleware is also running");
  next();
};
