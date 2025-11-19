import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class UserValidator {
  private static name = joi.string().min(3).max(10).trim();
  private static age = joi.number().min(2).max(100);
  private static phone = joi.string().regex(RegexEnum.PHONE);
  private static email = joi.string().lowercase().trim().regex(RegexEnum.EMAIL);
  private static password = joi.string().regex(RegexEnum.PASSWORD);

  public static create = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    phone: this.phone,
    email: this.email.required(),
    password: this.password.required(),
  });

  public static update = joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public static signIn = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static changePassword = joi.object({
    password: this.password.required(),
    oldPassword: this.password.required(),
  });
}
