import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import { Usermodel } from "../models/user.js";
import { TokenPayload } from "../types/expressTypes.js";
import { AuthRequest } from "../types/expressTypes.js";

export const isLoggedIn = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.cookies?.token;
    if (!token) {
      req.log.warn("token was not found");
      return res.status(400).json({
        message: "Please login first",
        success: false,
      });
    }

    let decoded: TokenPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    } catch (error) {
      req.log.warn("invalid or expired token");
      return res.status(401).json({
        message: "invalid or expired token",
        success: false,
      });
    }

    let user = await Usermodel.findById(decoded.id);

    if (!user) {
      req.log.warn("user is not found");
      return res.status(400).json({
        message: "user is not found or deleted",
        success: false,
      });
    }

    if (!user.isActive) {
      req.log.warn("user is not active");
      return res.status(403).json({
        message: "user is not active or deleted",
        success: false,
      });
    }

    req.log.info("user is successfully authenticated");

    req.user = user;

    next();
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
};
