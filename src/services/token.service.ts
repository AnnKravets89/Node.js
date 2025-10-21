import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        jwt.sign(payload, config.JWT_ACCESS_SECRET);
    }
}
