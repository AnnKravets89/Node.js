import { RoleEnum } from "../enums/role.enum";

interface IToken {
  _id: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}

interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
type IRefresh = Pick<IToken, "refreshToken">;

export { IRefresh, IToken, ITokenPair, ITokenPayload };
