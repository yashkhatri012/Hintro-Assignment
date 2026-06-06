import express from "express";
import {
  register,
  login,
  me,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const authRoutes  = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
authRoutes.post("/register", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 */
authRoutes.post("/login", login);
authRoutes.get("/me", protect, me);


export default authRoutes;