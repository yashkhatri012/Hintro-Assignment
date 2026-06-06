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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - meetingDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Q3 Planning Meeting
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Alice", "Bob"]
 *               meetingDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-06-06T10:00:00Z
 *               transcript:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - timestamp
 *                     - speaker
 *                     - text
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                       example: "00:01:23"
 *                     speaker:
 *                       type: string
 *                       example: Alice
 *                     text:
 *                       type: string
 *                       example: "Let's discuss the Q3 targets."
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *       400:
 *         description: Missing required fields
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
 *       404:
 *         description: Meeting not found
 */

//analysis
meetingRoutes.post("/:id/analyze",analyzeMeetingController);
export default meetingRoutes;