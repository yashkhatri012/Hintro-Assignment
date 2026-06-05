import Meeting from "../models/Meeting.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



export const createMeeting = async (req, res, next) => {
  try {
    const meeting = await Meeting.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(new ApiResponse(req.traceId, meeting));
  } catch (error) {
    next(error);
  }
};


export const getMeetings = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const meetings = await Meeting.find({
      createdBy: req.user.id,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json(
      new ApiResponse(req.traceId, meetings)
    );
  } catch (error) {
    next(error);
  }
};



export const getMeetingById = async (
  req,
  res,
  next
) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!meeting) {
      throw new ApiError(
        404,
        "MEETING_NOT_FOUND",
        "Meeting not found"
      );
    }

    res.status(200).json(
      new ApiResponse(req.traceId, meeting)
    );
  } catch (error) {
    next(error);
  }
};