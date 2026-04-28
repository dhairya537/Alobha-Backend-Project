import { Router } from "express";
import { validationregister } from "../validations/registervalidation.js";
import { login, logout, register } from "../controllers/auth.controller.js";
import { validationlogin } from "../validations/loginvalidation.js";

const Auth = Router();
Auth.post("/register", validationregister, register);
Auth.post("/login", validationlogin, login);
Auth.get("/logout", logout);

export default Auth;
