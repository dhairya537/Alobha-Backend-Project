import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  SESSION_SECRET: z.string().min(1, "session secret is required"),
  JWT_SECRET: z.string().min(1, "session secret is required"),
  MONGO_URI: z.string().min(1, "MongoDB url is required"),
});

const Parseenv = envSchema.safeParse(process.env);

if (!Parseenv.success) {
  console.error("invalid error from enviromenatl variables");
  console.error(Parseenv.error.format());
  process.exit(1);
}

export const env = Parseenv.data;
