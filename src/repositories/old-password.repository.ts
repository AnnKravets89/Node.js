import { IOldPassword } from "../interfaces/old-password.interface";
import { OldPassword } from "../models/old-password.model";

class OldPasswordRepository {
  public async create(dto: IOldPassword): Promise<IOldPassword> {
    return await OldPassword.create(dto);
  }

  public async findByParams(userId: string): Promise<IOldPassword[]> {
    return await OldPassword.find({ _userId: userId });
  }
}

export const oldPasswordRepository = new OldPasswordRepository();
