import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION,
    });

    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRATION,
    });

    return { accessToken, refreshToken };
  }

  public verifyToken(
    token: string,
    type: TokenTypeEnum | ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = config.JWT_ACCESS_SECRET;
          break;

        case TokenTypeEnum.REFRESH:
          secret = config.JWT_REFRESH_SECRET;
          break;

        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = config.ACTION_FORGOT_PASSWORD_SECRET;
          break;

        default:
          throw new ApiError("Invalid token type", 400);
      }
      return jwt.verify(token, secret) as ITokenPayload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }

  public generateActionTokens(
    payload: ITokenPayload,
    tokenType: ActionTokenTypeEnum,
  ): string {
    let secret: string;
    let expiresIn: any;

    switch (tokenType) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = config.ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = config.ACTION_FORGOT_PASSWORD_EXPIRATION;
        break;
      default:
        throw new ApiError("Invalid token type", 400);
    }

    return jwt.sign(payload, secret, { expiresIn });
  }
}

export const tokenService = new TokenService();
