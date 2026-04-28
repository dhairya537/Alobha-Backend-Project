import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/expressTypes.js";

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        req.log.warn("user is not authenticated");
        return res.status(401).json({
          message: "User is not Authenticated",
          success: false,
        });
      }

      if (!roles.includes(req.user.role)) {
        req.log.warn({
          userid: req.user.id,
          role: req.user.role,
          allowedrole: roles,
          message: "Access denied insifficient permission",
        });

        return res.status(401).json({
          message: "Access denied",
          success: false,
        });
      }

      req.log.info({
        userid: req.user.id,
        role: req.user.role,
        message: "Authorization successfull",
        success: true,
      });

      next();
    } catch (error) {
      req.log.error(error, "server error");
      return res.status(500).json({
        message: "something went wrong from backend",
        success: false,
      });
    }
  };
};
