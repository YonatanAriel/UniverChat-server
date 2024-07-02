const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const encryptPassword = (password: string) => {
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  return hashedPassword;
};
export const comparePasswords = (
  firstPassword: string,
  secondPassword: string
): boolean => {
  const isPasswordMatch = bcrypt.compareSync(firstPassword, secondPassword);
  return isPasswordMatch as boolean;
};

export const createToken = (data: { userName: string }) => {
  const SECRET = process.env.SECRET;
  const token = jwt.sign(data, SECRET, { expiresIn: "120d" });
  return token;
};
