import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { Usermodel } from "../models/user.js";
import { IUsers } from "../types/expressTypes.js";
import bcrypt from "bcrypt";

const rest = Router();

rest.post("/create", async (req: Request, res: Response) => {
  try {
    let body: IUsers = req.body;
    let { name, username, age, email, password } = body;

    let existsUser = await Usermodel.findOne({ email });

    if (existsUser) {
      req.log.warn("user email id is already registered");
      return res.status(401).json({
        message: "User email is already in use",
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

    req.log.info("user account is created successfully done");

    return res.status(200).json({
      message: "user account is created successfully done",
      success: true,
      data: newuser,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
});

rest.get("/read", async (req: Request, res: Response) => {
  try {
    let userdata = await Usermodel.find();
    if (userdata.length === 0) {
      req.log.warn("user data is not available");
      return res.status(404).json({
        message: "User data is not available on database",
        success: false,
      });
    }

    req.log.info("user data is successfully fetched");
    return res.status(200).json({
      message: "User data is successfully fetched",
      success: true,
      data: userdata,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
});

rest.get("/read/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let singleuser = await Usermodel.findById(id);

    if (!singleuser) {
      req.log.warn("user is not found");
      return res.status(404).json({
        message: "user is not found",
        success: false,
      });
    }

    req.log.info("user data is fetched successfully done");
    return res.status(200).json({
      message: "single user data is fetched successfully done",
      success: true,
      data: singleuser,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
});

rest.delete("/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let deleteuser = await Usermodel.findByIdAndDelete(id);
    if (!deleteuser) {
      req.log.warn("User is not found");
      return res.status(404).json({
        message: "user is not found",
        success: false,
      });
    }

    req.log.info("user is successfully deleted");

    return res.status(200).json({
      message: "User is successfully deleted",
      success: true,
      data: deleteuser,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
});

rest.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    let updateduser = await Usermodel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateduser) {
      req.log.warn("User is not found");
      return res.status(404).json({
        message: "user is not found",
        success: false,
      });
    }

    req.log.info("user data is updated successsfully done");

    return res.status(200).json({
      message: "User data is updated successfully done",
      success: true,
      data: updateduser,
    });
  } catch (error) {
    req.log.error(error, "server error from backend");
    return res.status(500).json({
      message: "server error from backend",
      success: false,
    });
  }
});

export default rest;
