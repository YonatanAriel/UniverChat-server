"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = __importDefault(require("../../DL/controllers/users.controller"));
const auth_1 = require("../utils/auth");
const uploadPhoto_1 = require("./cloudinaryServices/uploadPhoto");
class UsersServices {
    static signUp(data, photoPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!data.userName || !data.password || !data.clientId)
                    return { error: "Missing data" };
                const isUserNameTaken = this.getUserByUserName(data.userName);
                if (isUserNameTaken)
                    return { error: "User name already taken" };
                const hashedPassword = (0, auth_1.encryptPassword)(data.password);
                data.password = hashedPassword;
                if (photoPath) {
                    data.photo = yield (0, uploadPhoto_1.uploadPhoto)(photoPath);
                }
                const userSQLId = users_controller_1.default.create(data);
                if (!userSQLId)
                    return { error: "Error in creating user" };
                const token = (0, auth_1.createToken)({ userName: data.userName });
                return { token, userSQLId };
            }
            catch (err) { }
        });
    }
}
_a = UsersServices;
UsersServices.getAllUsers = () => {
    const allUsers = users_controller_1.default.read();
    return allUsers;
};
UsersServices.getUserById = (id) => {
    const user = users_controller_1.default.readOne("id", id);
    return user;
};
UsersServices.getUserByUserName = (userName) => {
    const user = users_controller_1.default.readOne("user_name", userName);
    return user;
};
UsersServices.signIn = (data) => {
    try {
        if (!data.userName || !data.password)
            return { error: "Missing data" };
        const user = _a.getUserByUserName(data.userName);
        if (!user || !user.password)
            return { error: "Wrong username or password" };
        const isPasswordMatch = (0, auth_1.comparePasswords)(data.password, user.password);
        if (!isPasswordMatch)
            return { error: "Wrong username or password" };
        const userSQLId = user === null || user === void 0 ? void 0 : user.id;
        const token = (0, auth_1.createToken)({ userName: data.userName });
        return { token, userSQLId };
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = UsersServices;
