import { AuthType, register } from "@/services/authenticate";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("les mots de passes ne correspondent pas.");
    }

    const data: AuthType = {
      username: email,
      password: password,
    };

    await register(data);
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="card w-96 shadow-xl rounded-md bg-slate-200">
      <form className="card-body" onSubmit={onRegisterSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full">register me</button>
        </div>
      </form>
    </div>
  );
}
