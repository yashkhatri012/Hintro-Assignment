import Meeting from "../models/Meeting.js";
import { analyzeMeeting } from "../services/gemini.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const analyzeMeetingController = async (req, res, next) => {
  try {
    const meeting = await Meeting.findById(
      req.params.id
    );

    if (!meeting) {
      throw new ApiError(
        404,
        "MEETING_NOT_FOUND",
        "Meeting not found"
      );
    }

    const analysis = await analyzeMeeting(meeting);
    const savedAnalysis = await Analysis.create({
      meetingId: meeting._id,
      ...analysis
    });

    res.status(200).json(
      new ApiResponse(req.traceId, savedAnalysis)
    );
  } catch (error) {
    next(error);
  }
};