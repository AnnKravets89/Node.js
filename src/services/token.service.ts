import jwt from "jsonwebtoken";

import { config } from "../configs/config";
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

  public verifyToken(token: string): ITokenPayload {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET) as ITokenPayload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}

export const tokenService = new TokenService();
