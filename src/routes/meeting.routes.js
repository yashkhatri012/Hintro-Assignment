import express from "express";

import {
  createMeeting,
  getMeetings,
  getMeetingById,
} from "../controllers/meeting.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const meetingRoutes = express.Router();

meetingRoutes.use(protect);

meetingRoutes.post("/", createMeeting);
meetingRoutes.get("/", getMeetings);
meetingRoutes.get("/:id", getMeetingById);

export default meetingRoutes;