import { spamCron } from "./spam.cron";

export const cronRunner = async () => {
    //testCron.start();
    //removeOldTokensCron.start();
    spamCron.start();
};
