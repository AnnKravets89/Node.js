import { FilterQuery } from "mongoose";

import { OrderEnum } from "../enums/order.enum";
import { IUser, IUserQuery } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = {};

    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }

    const skip = query.limit * (query.page - 1);

    const sortObj: Record<string, 1 | -1> = {};
    if (query.orderBy) {
      sortObj[query.orderBy] = query.order === OrderEnum.ASC ? 1 : -1;
    }

    return await Promise.all([
      User.find(filterObj).limit(query.limit).skip(skip).sort(sortObj),
      User.countDocuments(filterObj),
    ]);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select("+password");
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }
}

export const userRepository = new UserRepository();
