import { UserLogin } from "../models/userModel";
import axios from "../utils/axios";

const loginUserService = async (user: UserLogin) => {
  const response = await axios({
    method: "POST",
    url: "/api/user/login",
    data: {
      personCode: user.PersonCode,
      password: user.PersonSystemPassword,
    },
  });
  return response.data;
};

export { loginUserService };
