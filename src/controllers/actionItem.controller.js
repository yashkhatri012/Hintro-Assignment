import ActionItem from "../models/ActionItem.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getActionItems = async (req, res, next) => {
  try {
    const { status, assignee, meetingId } = req.query;

    const query = {
      createdBy: req.user.id,
    };

    if (status) {
      query.status = status;
    }

    if (assignee) {
      query.assignee = assignee;
    }

    if (meetingId) {
      query.meetingId = meetingId;
    }

    const actionItems = await ActionItem.find(query);

    res.status(200).json(new ApiResponse(req.traceId, actionItems));
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
     const validStatuses = [
      "PENDING",
      "IN_PROGRESS",
      "COMPLETED",
    ];

    if (!validStatuses.includes(status)) {
      throw new ApiError(
        400,
        "INVALID_STATUS",
        "Invalid status value"
      );
    }

    const actionItem = await ActionItem.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!actionItem) {
      throw new ApiError(404, "ACTION_ITEM_NOT_FOUND", "Action item not found");
    }

    actionItem.status = status;

    await actionItem.save();

    res.status(200).json(new ApiResponse(req.traceId, actionItem));
  } catch (error) {
    next(error);
  }
};

// status != COMPLETED and dueDate < current time

export const getOverdueItems = async (
  req,
  res,
  next
) => {
  try {

//     const items = await ActionItem.find();

// items.forEach((item) => {
//   console.log(
//     item._id,
//     item.dueDate,
//     item.dueDate < new Date()
//   );
// });

   const overdueItems = await ActionItem.find({
      createdBy: req.user.id,
      status: { $ne: "COMPLETED" },
      dueDate: {
        $ne: null,
        $lt: new Date(),
      },
    });


    res.status(200).json(
      new ApiResponse(
        req.traceId,
        overdueItems
      )
    );
  } catch (error) {
    next(error);
  }
};