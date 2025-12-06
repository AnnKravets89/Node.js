import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async getMe(jwtPayLoad: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayLoad.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async updateMe(jwtPayLoad: ITokenPayload, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(jwtPayLoad.userId, dto);
  }

  public async uploadAvatar(
    jwtPayLoad: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(jwtPayLoad.userId);

    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      user._id,
    );
    const updatedUser = await userRepository.updateById(user._id, { avatar });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    return updatedUser;
  }

  public async deleteAvatar(jwtPayLoad: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayLoad.userId);

    if (!user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    return await userRepository.updateById(user._id, { avatar: null });
  }

  public async deleteMe(jwtPayLoad: ITokenPayload): Promise<void> {
    return await userRepository.deleteById(jwtPayLoad.userId);
  }
}

export const userService = new UserService();
