import path from "node:path";

import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { fileConfig } from "../configs/file.config";
import { ApiError } from "../errors/api-error";

class FileMiddleware {
  public isFileValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.files?.[key] as UploadedFile;

        if (!file) {
          throw new ApiError("No file upload", 404);
        }

        if (file.size > fileConfig.AVATAR_MAX_SIZE) {
          throw new ApiError("File is too large. Max 5MB allowed", 413);
        }

        if (!fileConfig.AVATAR_ALLOWED_MIMETYPES.includes(file.mimetype)) {
          throw new ApiError("Invalid file type. Only images allowed.", 415);
        }

        const ext = path.extname(file.name).toLowerCase();
        if (!fileConfig.AVATAR_ALLOWED_EXTENSIONS.includes(ext)) {
          throw new ApiError("Invalid file extension", 415);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
