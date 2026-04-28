import { Request, Response, NextFunction } from "express";
import { Apperror } from "../types/expressTypes.js";

const errorMiddleware = (
  err: Apperror,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.message = err.message || "invalid error from backend";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });
};

export default errorMiddleware;
