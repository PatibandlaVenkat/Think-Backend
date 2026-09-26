import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import focusSessionRoutes from "./routes/focusSession.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/focus", focusSessionRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Think Backend API Running 🚀",
  });
});

export default app;