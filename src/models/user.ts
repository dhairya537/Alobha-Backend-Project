import mongoose from "mongoose";
import { IUsers } from "../types/expressTypes.js";

const Userschema = new mongoose.Schema<IUsers>({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Usermodel = mongoose.model<IUsers>("user", Userschema);
