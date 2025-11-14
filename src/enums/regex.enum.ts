export const RegexEnum = {
  EMAIL: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/,
  PHONE: /^(?:\+380|0)\d{9}$/,
};
