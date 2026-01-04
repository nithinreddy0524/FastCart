import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "https://fast-cart-frontend.vercel.app", // NO trailing slash
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Preflight fix (VERY IMPORTANT for Vercel)
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// ✅ Correct PORT logic
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running " + PORT
  });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running", PORT);
  });
});