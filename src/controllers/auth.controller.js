

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(
        400,
        "USER_ALREADY_EXISTS",
        "User already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(
      new ApiResponse(
        req.traceId,
        {
          id: user._id,
          email: user.email,
          message : "User registered successfully"
        },
        
      )
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid credentials"
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      throw new ApiError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid credentials"
      );
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json(
      new ApiResponse(
        req.traceId,
        {
          id: user._id,
          email: user.email,
          token,
          message: "Login successful"
        },
        
      )
    );
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};