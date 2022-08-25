import { NextApiRequest, NextApiResponse } from "next";
import authenticate from "../../../controllers/userController";

// http://localhost:3000/api/user/login

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { personCode, password } = req.body;

    // this will return to us the token if user was found and the password is correct
    const token = await authenticate(personCode, password);
    if (token) {
      return res.status(200).json({
        status: "success",
        token,
      });
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export default login;
