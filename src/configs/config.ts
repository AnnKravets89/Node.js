import * as process from "node:process";

import dotenv from "dotenv";

dotenv.config();

interface IConfig {
  APP_PORT: string | number;
  APP_HOST: string;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRATION: any;
  JWT_REFRESH_EXPIRATION: any;
}

export const config: IConfig = {
  APP_PORT: process.env.APP_PORT || 3001,
  APP_HOST: process.env.APP_HOST,

  MONGO_URI: process.env.MONGO_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
};
