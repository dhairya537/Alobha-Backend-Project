import { Router, Request, Response } from "express";

const local = Router();

local.get("/check", (req: Request, res: Response) => {
  req.log.info("home page hit");
  res.render("home");
});
export default local;
