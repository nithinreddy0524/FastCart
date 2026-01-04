import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";

dotenv.config();

const app = express();

// ✅ CORS (safe for prod)
app.use(cors({
  origin: true, // allow vercel + preview + prod
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Handle preflight
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({ crossOriginResourcePolicy: false }));

// ✅ DB connection (only once)
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);

// ✅ EXPORT — DO NOT LISTEN
export default app;
