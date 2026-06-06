import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";

import { traceMiddleware } from "./middleware/trace.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import actionItemRoutes from "./routes/actionItem.routes.js";


//swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import EvaluationRoute from "./routes/evaluation.routes.js";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Core Middleware
app.use(cors());
app.use(express.json());
app.use(traceMiddleware);


// Health Check
app.get("/health", (req, res) => {
  res.status(200).json(
    new ApiResponse(
      req.traceId,
      {
        status: "UP",
      }
    )
  );
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/action-items", actionItemRoutes);

//Evaluation endpoint
app.use("/api/evaluation", EvaluationRoute);


// Global Error Handler
app.use(errorHandler);


export default app;