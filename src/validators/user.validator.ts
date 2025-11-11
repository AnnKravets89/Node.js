import joi from "joi";

export class UserValidator {
  private static name = joi.string().min(3).max(10).trim();
  private static age = joi.number().min(2).max(100);
  private static phone = joi.string().regex(/^(?:\+380|0)\d{9}$/);
  private static email = joi
    .string()
    .regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/);
  private static password = joi
    .string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/);

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
}
