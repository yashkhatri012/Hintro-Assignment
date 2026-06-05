import express from "express";
import {
  register,
  login,
  me,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const authRoutes  = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);
authRoutes.get("/me", protect, me);


export default authRoutes;