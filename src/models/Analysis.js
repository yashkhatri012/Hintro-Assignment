import mongoose from "mongoose";

const citationSchema = new mongoose.Schema(
  {
    timestamp: String,
  },
  { _id: false }
);

const insightSchema = new mongoose.Schema(
  {
    text: String,
    citations: [citationSchema],
  },
  { _id: false }
);

const actionItemSchema = new mongoose.Schema(
  {
    task: String,
    assignee: String,
    citations: [citationSchema],
  },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
  {
    meetingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
      unique: true,
    },

    summary: [insightSchema],

    decisions: [insightSchema],

    followUps: [insightSchema],

    actionItems: [actionItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Analysis", analysisSchema);