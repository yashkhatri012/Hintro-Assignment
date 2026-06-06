import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  getActionItems,
  updateStatus,
  getOverdueItems,
} from "../controllers/actionItem.controller.js";

const actionItemRoutes = express.Router();

actionItemRoutes.use(protect);
/**
 * @swagger
 * /api/action-items:
 *   get:
 *     summary: Get action items
 *     tags: [Action Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of action items
 */
actionItemRoutes.get("/", getActionItems);

/**
 * @swagger
 * /api/action-items/overdue:
 *   get:
 *     summary: Get overdue action items
 *     tags: [Action Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overdue action items
 */
actionItemRoutes.get("/overdue", getOverdueItems);

/**
 * @swagger
 * /api/action-items/{id}/status:
 *   patch:
 *     summary: Update action item status
 *     tags: [Action Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Action item not found
 */
actionItemRoutes.patch("/:id/status", updateStatus);

export default actionItemRoutes;
