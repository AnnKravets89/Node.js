import { IUser } from "../interfaces/user.interface";
import { read } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }
}

export const userRepository = new UserRepository();
