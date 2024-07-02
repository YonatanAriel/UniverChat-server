"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.comparePasswords = exports.encryptPassword = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const encryptPassword = (password) => {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    return hashedPassword;
};
exports.encryptPassword = encryptPassword;
const comparePasswords = (firstPassword, secondPassword) => {
    const isPasswordMatch = bcrypt.compareSync(firstPassword, secondPassword);
    return isPasswordMatch;
};
exports.comparePasswords = comparePasswords;
const createToken = (data) => {
    const SECRET = process.env.SECRET;
    const token = jwt.sign(data, SECRET, { expiresIn: "120d" });
    return token;
};
exports.createToken = createToken;
