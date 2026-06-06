import cron from "node-cron";
import ActionItem from "../models/ActionItem.js";
import ReminderHistory from "../models/ReminderHistory.js";
import { sendTelegramMessage } from "../services/telegram.service.js";

export const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    
    const overdueItems =
  await ActionItem.find({
    status: {
      $ne: "COMPLETED",
    },

    dueDate: {
      $ne: null,
      $lt: new Date(),
    },
  });

console.log(
  `Found ${overdueItems.length} overdue items`
);

    for (const item of overdueItems) {
    const alreadySent =
      await ReminderHistory.findOne({
        actionItemId: item._id,
        reminderType: "OVERDUE",
      });

    if (alreadySent) {
      continue;
    }

    await sendTelegramMessage(
      `Reminder: ${item.task}`
    );

    await ReminderHistory.create({
      actionItemId: item._id,
      reminderType: "OVERDUE",
      status: "SUCCESS",
    });
  }



  });
};