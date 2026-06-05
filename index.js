import "dotenv/config";
import connectDB from "./src/config/db.js";
import express from "express";
const port = process.env.PORT || 5000;
const app = express();
await connectDB();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});


app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });