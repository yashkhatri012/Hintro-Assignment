import dotenv from "dotenv";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { startReminderJob } from "./src/jobs/reminder.job.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    startReminderJob();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server");
    console.error(error);

    process.exit(1);
  }
};

startServer();