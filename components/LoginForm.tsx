import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserLogin } from "../models/userModel";
import { loginUserService } from "../services/userServices";

function LoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const user: UserLogin = {
    PersonCode: Number(code),
    PersonSystemPassword: password,
  };
  // this function to handle the login function and what happens when logged in successfully or not
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const login = await loginUserService(user);
    if (login.token) {
      router.push("/HR/Employees");
    } else {
      alert("برجاء ادخال الكود و الرقم السري الصحيحين");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <form className="flex flex-col items-center justify-center font-display ">
        <input
          placeholder="الكود"
          className="w-[20vw] p-3 mb-3 text-right border border-gray-300 rounded-md focus:outline-blue-500 "
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          placeholder="كلمة السر"
          className="w-full p-3 text-right border border-gray-300 rounded-md focus:outline-blue-500 "
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-32 p-3 mt-4 text-white transition-all duration-200 ease-in-out bg-blue-900 rounded-lg hover:bg-blue-500"
        >
          دخول
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
