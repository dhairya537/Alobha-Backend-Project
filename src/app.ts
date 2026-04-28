import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rest from "./routers/rest.routes.js";
import { Request, Response, NextFunction } from "express";
import { Apperror } from "./types/expressTypes.js";
import errorMiddleware from "./middlewares/error.js";
import { requestlogger } from "./middlewares/requestLogger.js";
import { localmiddleware } from "./middlewares/localmiddleware.js";
import Globallimitter from "./middlewares/Globallimitter.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import Auth from "./routers/Auth.routes.js";
import local from "./routers/local.routes.js";

const app = express();

const filepath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filepath);

app.use(cookieParser());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(flash());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  }),
);

app.use(requestlogger);
app.use(localmiddleware);
app.use(Globallimitter);

app.set("view engine", "ejs");
app.set("views", path.join(dirname, "views"));
app.use(express.static(path.join(dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", rest);
app.use("/Auth/user/", Auth);
app.use("/local/", local);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("route not found") as Apperror;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

export default app;
