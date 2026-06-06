import mongoose from "mongoose";

const reminderHistorySchema = new mongoose.Schema(
  {
    actionItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActionItem",
      required: true,
    },

    reminderType: {
      type: String,
      enum: [
        "OVERDUE",
        "DUE_SOON",
      ],
      required: true,
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: [
        "SUCCESS",
        "FAILED",
      ],
      default: "SUCCESS",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ReminderHistory",
  reminderHistorySchema
);