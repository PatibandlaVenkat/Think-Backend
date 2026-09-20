import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Think Backend is running"
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});