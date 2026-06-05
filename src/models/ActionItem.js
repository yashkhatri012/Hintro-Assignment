import mongoose from "mongoose";
const citationSchema = new mongoose.Schema(
  {
    timestamp: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);
const actionItemSchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },

    task: {
      type: String,
      required: true,
      trim: true,
    },

    assignee: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED",
      ],
      default: "PENDING",
    },

    citations: [citationSchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ActionItem = mongoose.model(
  "ActionItem",
  actionItemSchema
);

export default ActionItem;