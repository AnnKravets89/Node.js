import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserQuery } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = res.locals.query as IUserQuery;
      console.log(query);

      const result = await userService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayLoad = req.res.locals.jwtPayload as ITokenPayload;
      const result = await userService.getMe(jwtPayLoad);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayLoad = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IUser;

      const result = await userService.updateMe(jwtPayLoad, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayLoad = req.res.locals.jwtPayload as ITokenPayload;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(jwtPayLoad, avatar);
      const result = userPresenter.toPublicResDto(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayLoad = req.res.locals.jwtPayload as ITokenPayload;

      const user = await userService.deleteAvatar(jwtPayLoad);
      const result = userPresenter.toPublicResDto(user);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayLoad = req.res.locals.jwtPayload as ITokenPayload;
      await userService.deleteMe(jwtPayLoad);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
