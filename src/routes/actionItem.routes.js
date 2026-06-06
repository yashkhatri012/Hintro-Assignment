import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  getActionItems,
  updateStatus,
  getOverdueItems,
} from "../controllers/actionItem.controller.js";

const actionItemRoutes = express.Router();

actionItemRoutes.use(protect);

actionItemRoutes.get("/", getActionItems);

actionItemRoutes.get("/overdue", getOverdueItems);

actionItemRoutes.patch("/:id/status", updateStatus);

export default actionItemRoutes;
