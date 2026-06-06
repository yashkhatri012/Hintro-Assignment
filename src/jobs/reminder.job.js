import cron from "node-cron";
import ActionItem from "../models/ActionItem.js";


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
  console.log(
    `Reminder: ${item.task}`
  );
}


// const allItems =
//   await ActionItem.find({});

// console.log("ALL ITEMS:");
// console.log(allItems);
  });
};