import { CronJob } from "cron";

const handler = async () => {
  console.log("TestCron is running");
};

export const testCron = new CronJob("* 1 * * * *", handler);
