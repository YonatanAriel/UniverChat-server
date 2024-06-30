import UsersController from "../../DL/controllers/users.controller";
import { createToken, encryptPassword } from "../utils/auth";
import { uploadPhoto } from "./cloudinaryServices/uploadPhoto";

interface SignInData {
  userName: string;
  password: string;
}
interface SignUpData extends SignInData {
  clientId: string;
  photo?: string;
  email?: string;
}

class UsersServices {
  static getAllUsers = () => {
    const allUsers = UsersController.read();
    return allUsers;
  };

  static getUserById = (id: string) => {
    const user = UsersController.readOne("id", id);
    return user;
  };

  static getUserByUserName = (userName: string) => {
    const user = UsersController.readOne("user_name", userName);
    return user;
  };

  static async signUp(data: SignUpData, photoPath: string | undefined) {
    try {
      if (!data.userName || !data.password || !data.clientId)
        return { error: "Missing data" };

      const isUserNameTaken = this.getUserByUserName(data.userName);
      if (isUserNameTaken) return { error: "User name already taken" };

      const hashedPassword = encryptPassword(data.password);
      data.password = hashedPassword;

      if (photoPath) {
        data.photo = await uploadPhoto(photoPath);
      }

      const userSQLId = UsersController.create(data);
      if (!userSQLId) return { error: "Error in creating user" };

      const token = createToken({ userName: data.userName });
      return { token, userSQLId };
    } catch (err) {}
  }
}

export default UsersServices;
