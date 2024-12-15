"use client";

import React, { useState } from "react";
import { login, AuthType } from "@/services/authenticate";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: AuthType = {
      username: email,
      password: password,
    };

    try {
      await login(data);
      toast.success("Heureux de vous revoir !");

      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erreur lors de la connexion !");
    }
  };

  return (
    <div className="card w-96 shadow-xl rounded-md bg-slate-200">
      <form className="card-body" onSubmit={onLoginSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
        />

        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
