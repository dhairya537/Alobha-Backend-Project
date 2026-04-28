import logger from "../config/logger.js";
export interface Apperror extends Error {
  statusCode?: number;
}

export interface IUsers {
  name: string;
  username: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
  isActive: boolean;
}

export interface RegisterDTO {
  name: string;
  username: string;
  age: number;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
  log: typeof logger;
  cookies: {
    token?: string;
  };
}
