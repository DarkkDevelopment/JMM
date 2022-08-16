import { useRouter } from "next/router";
import React from "react";

function LoginForm() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center ">
      <form className="flex flex-col items-center justify-center font-display ">
        <input
          placeholder="الكود"
          className="w-[20vw] p-3 mb-3 text-right border border-gray-300 rounded-md focus:outline-blue-500 "
          type="email"
          id="email"
        />
        <input
          placeholder="كلمة السر"
          className="w-full p-3 text-right border border-gray-300 rounded-md focus:outline-blue-500 "
          type="password"
          id="password"
        />
        <button
          onClick={() => {
            router.push("/HR/Employees");
          }}
          className="w-32 p-3 mt-4 text-white transition-all duration-200 ease-in-out bg-blue-900 rounded-lg hover:bg-blue-500"
        >
          دخول
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
