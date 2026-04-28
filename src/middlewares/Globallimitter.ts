import rateLimit from "express-rate-limit";

const Globallimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too Many Request , Try Again Later",
    success: false,
  },
});

export default Globallimitter;
