import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const RegisterSchema = z.object({
  name: z.string().min(1, "name is required"),
  username: z.string().min(1, "username is required"),
  age: z.number().int().min(10, "age must be at least 10"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export const validationregister = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = RegisterSchema.safeParse(req.body);

  if (!result.success) {
    req.log.warn("validation is failed");
    return res.status(400).json({
      message: "validation is failed",
      error: result.error,
      success: false,
    });
  }
  req.log.info("validation is successfully done");
  req.body = result.data;
  next();
};
