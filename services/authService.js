import { account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService = {
  //Register a User
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      return {
        error: error.message || "Registration Failed, Please try again",
      };
    }
  },

  //Login a User
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      return { error: error.message || "Login Failed, Please try again" };
    }
  },

  //Get Logged in User
  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  //Logout a User
  async logout() {
    try {
      await account.deleteSessions("current");
    } catch (error) {
      return { error: error.message || "Logout Failed, Please try again" };
    }
  },
};

export default authService;
