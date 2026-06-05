import Meeting from "../models/Meeting.js";
import { analyzeMeeting } from "../services/gemini.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Analysis from "../models/Analysis.js";
import ActionItem from "../models/ActionItem.js";

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
//     const existingAnalysis = await Analysis.findOne({
//   meetingId: meeting._id,
// });

    // if (existingAnalysis) {
    //   return res.status(200).json(
    //     new ApiResponse(req.traceId, existingAnalysis)
    //   );
    // }
    const analysis = await analyzeMeeting(meeting);
    const savedAnalysis = await Analysis.create({
      meetingId: meeting._id,
      ...analysis
    });

    for (const item of analysis.actionItems) {
      await ActionItem.create({
        meetingId: meeting._id,
        task: item.task,
        assignee: item.assignee,
        citations: item.citations,
        createdBy: req.user.id,
      });
    }
    res.status(200).json(
      new ApiResponse(req.traceId, savedAnalysis)
    );
  } catch (error) {
    next(error);
  }
};