import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { config } from "./configs/config";
import { cronRunner } from "./crons/index.cron";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send(error.message);
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(config.APP_PORT, async () => {
  await mongoose.connect(config.MONGO_URI);
  cronRunner();
  console.log(
    `Server is running on http://${config.APP_HOST}:${config.APP_PORT}`,
  );
});
