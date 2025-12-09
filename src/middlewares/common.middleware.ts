import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }

  public isQueryValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validated = await validator.validateAsync(req.query, {
          convert: true, // converting types if it possible
          abortEarly: false, // don't stop on the first mistake, collecting them together
          stripUnknown: true, // removes all fields that aren't in the Joi schema
        });
        res.locals.query = validated;
        console.log(validated);

        next();
      } catch (e) {
        if (e.details?.[0]?.message) {
          next(new ApiError(e.details[0].message, 400));
          return;
        }
        next(new ApiError(e.message || "Validation error", 400));
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
