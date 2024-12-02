"use client";

import { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function Index() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col space-y-3 items-center justify-center h-screen">
      <div className="font-bold text-2xl">Rempro app admin dashboard</div>
      {isLogin ? <Login /> : <Register />}
      <a
        href="#"
        onClick={toggleForm}
        className="text-blue-500 hover:text-blue-300 mt-4 lowercase italic"
      >
        {isLogin
          ? "You don't have any account? create it now."
          : "Already have an account? Login"}
      </a>
    </div>
  );
}
