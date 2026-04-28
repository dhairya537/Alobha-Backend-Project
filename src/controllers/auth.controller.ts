import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RegisterDTO } from "../types/expressTypes.js";
import { LoginDTO } from "../types/expressTypes.js";
import { Usermodel } from "../models/user.js";
import { env } from "../config/env.js";

export const register = async (req: Request, res: Response) => {
  try {
    let body: RegisterDTO = req.body;
    let { name, username, age, email, password } = body;

    let user = await Usermodel.findOne({ email });

    if (user) {
      req.log.warn("user is already registered in our systum");
      return res.status(400).json({
        message: "user is already registered",
        success: false,
      });
    }

    if (!name || !username || !age || !email || !password) {
      req.log.warn("empty field is not allowed type some data....");
      return res.status(404).json({
        message: "empty field is not allowed",
        success: false,
      });
    }

    let saltround = 10;
    let salt = await bcrypt.genSalt(saltround);
    let hash = await bcrypt.hash(password, salt);

    let newuser = await Usermodel.create({
      name,
      username,
      age,
      email,
      password: hash,
    });

    let token = jwt.sign(
      { id: newuser._id, email: newuser.email },
      env.JWT_SECRET,
      { expiresIn: "7h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    req.log.info("user is registered successfully done");

    return res.status(200).json({
      message: "User account is created successfully done",
      success: true,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
};

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let body: LoginDTO = req.body;
    const { email, password } = body;

    if (!email || !password) {
      req.log.warn("email and password is required");
      return res.status(400).json({
        message: "email or password is required",
        success: false,
      });
    }
    let isexists = await Usermodel.findOne({ email });

    if (!isexists) {
      req.log.warn("invalid email or password");
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    let ismatched = await bcrypt.compare(password, isexists.password);

    if (!ismatched) {
      req.log.warn("invalid email or password");
      return res.status(401).json({
        message: "invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: isexists._id, email: isexists.email },
      env.JWT_SECRET,
      { expiresIn: "7h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    req.log.info("User is loggedin successfully done");

    return res.status(200).json({
      message: "User is logged in successfully done",
      success: true,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      req.log.warn("User is already logged out");
      return res.status(400).json({
        message: "User is already logged out",
        success: false,
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    req.log.info("user is logout successfully is done");

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
};
