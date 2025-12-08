import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  phone?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ISignIn extends Pick<IUser, "email" | "password"> {}

type IResetPasswordSend = Pick<IUser, "email">;
type IResetPasswordSet = Pick<IUser, "password"> & { token: string };
type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };

interface IUserQuery {
  limit: number;
  page: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}

interface IUserResponse
  extends Pick<
    IUser,
    | "_id"
    | "name"
    | "email"
    | "age"
    | "role"
    | "avatar"
    | "isDeleted"
    | "isVerified"
  > {}

interface IUserListResponse {
  data: IUserResponse[];
  total: number;
}

export type {
  IChangePassword,
  IResetPasswordSend,
  IResetPasswordSet,
  ISignIn,
  IUser,
  IUserListResponse,
  IUserQuery,
  IUserResponse,
};
