import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";

import { traceMiddleware } from "./middleware/trace.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";


const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());



// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

// Evaluation Endpoint
app.get("/api/evaluation", (req, res) => {
  res.status(200).json({
    traceId: req.traceId,
    success: true,
    data: {
      candidateName: "Yash",
      email: "yashkhatri88540@gmail.com",
      repositoryUrl: "https://github.com/yashkhatri012/Hintro-Assignment",
      deployedUrl: "",
      externalIntegration: "",
      features: [
        "Authentication",
      ],
    },
  });
});

// Global Error Handler
app.use(errorHandler);


export default app;