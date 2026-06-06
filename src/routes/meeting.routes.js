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
/**
 * @swagger
 * /api/meetings:
 *   post:
 *     summary: Create a meeting
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Meeting created successfully
 */
meetingRoutes.post("/", createMeeting);
/**
 * @swagger
 * /api/meetings:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of meetings
 */
meetingRoutes.get("/", getMeetings);

/**
 * @swagger
 * /api/meetings/{id}:
 *   get:
 *     summary: Get meeting by ID
 *     tags: [Meetings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting found
 */
meetingRoutes.get("/:id", getMeetingById);

/**
 * @swagger
 * /api/meetings/{id}/analyze:
 *   post:
 *     summary: Analyze a meeting transcript using Gemini
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analysis generated successfully
 */

//analysis
meetingRoutes.post("/:id/analyze",analyzeMeetingController);
export default meetingRoutes;