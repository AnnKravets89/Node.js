import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

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

  public async deleteMe(jwtPayLoad: ITokenPayload): Promise<void> {
    return await userRepository.deleteById(jwtPayLoad.userId);
  }
}

export const userService = new UserService();
