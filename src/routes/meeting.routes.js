import express from "express";

import {
  createMeeting,
  getMeetings,
  getMeetingById,
} from "../controllers/meeting.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { analyzeMeeting } from "../services/gemini.service.js";
import { analyzeMeetingController } from "../controllers/analyze.controller.js";

const meetingRoutes = express.Router();

meetingRoutes.use(protect);

meetingRoutes.post("/", createMeeting);
meetingRoutes.get("/", getMeetings);
meetingRoutes.get("/:id", getMeetingById);


//analysis
meetingRoutes.post(
  "/:id/analyze",
  analyzeMeetingController
);
export default meetingRoutes;