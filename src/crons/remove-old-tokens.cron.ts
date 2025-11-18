import { CronJob } from "cron";

import { config } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString(
      config.JWT_REFRESH_EXPIRATION,
    );

    const date = timeHelper.subtractByParams(value, unit);
    const deletedCount = await tokenRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deletedCount} old tokens`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldTokensCron = new CronJob("0,20,40 * * * * *", handler);
