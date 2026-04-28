import rateLimit from "express-rate-limit";
const loginlimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too Many Request , Try Again Later",
    success: false,
  },
});

export default loginlimitter;
