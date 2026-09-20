import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Think Backend API Running 🚀",
  });
});

export default app;