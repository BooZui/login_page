"use client";

import { useState } from "react";
import styles from "./signupForm.module.css";
import Image from "next/image";

export default function SignupForm({ containerActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    if (password === rePassword && name && email && password) {
      const response = await fetch("api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        setError(true);
      }
      setCreatingUser(false);
    } else {
      setError(true);
      setCreatingUser(false);
    }
  }

  return (
    <div
      className={
        (containerActive === "active"
          ? "translate-x-[100%] opacity-[1] z-[5] move"
          : "z-[1] opacity-0 reMove") +
        " absolute top-0 h-[100%] transition-all duration-[0.6s] ease-in-out left-0 w-[50%]"
      }
    >
      <div className="bg-while absolute flex flex-col items-center justify-end w-full h-[33%]">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <button
          className="flex items-center mb-1 justify-center bg-[#ccc] rounded-lg mt-1 px-1 py-1"
          onClick={async () => await signIn("google", { callbackUrl: "/" })}
        >
          <Image src="/google.png" alt={""} width={24} height={24} />
          <span className="text-[14px] font-bold">Login with Google</span>
        </button>
        <span className="text-[12px]">or register with email.</span>
      </div>
      <form
        className="bg-white flex items-center justify-center flex-col px-[40px] h-[100%] pt-[28%]"
        onSubmit={handleFormSubmit}
      >
        <input
          className="bg-[#eee] border-none mx-0 my-1 px-3 py-2 text-[13px] rounded-2xl w-full outline-none"
          type="text"
          placeholder="Name"
          value={name}
          disabled={creatingUser}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="bg-[#eee] border-none mx-0 my-1 px-3 py-2 text-[13px] rounded-2xl w-full outline-none"
          type="email"
          placeholder="Email"
          value={email}
          disabled={creatingUser}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="bg-[#eee] border-none mx-0 my-1 px-3 py-2 text-[13px] rounded-2xl w-full outline-none"
          type="password"
          placeholder="Password"
          value={password}
          disabled={creatingUser}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          className="bg-[#eee] border-none mx-0 my-1 px-3 py-2 text-[13px] rounded-2xl w-full outline-none"
          type="password"
          placeholder="Re-enter Password"
          value={rePassword}
          disabled={creatingUser}
          onChange={(event) => setRePassword(event.target.value)}
        />
        <span className="text-[0.8em] font-bold text-red-600">
          {password === rePassword ? "" : "Passwords do not match"}
        </span>

        <button
          className={"text-[13px] bg-[#512da8] text-white py-2 px-8 border-[1px] border-solid border-transparent rounded-lg font-semibold tracking-[0.5px] uppercase mt-2 cursor-pointer"}
          type="submit"
          disabled={creatingUser}
        >
          Sign Up
        </button>
      </form>
      <div className="absolute bottom-[1em] w-full">
        {userCreated && (
          <div className="text-center text-[0.8em] font-bold">
            User created.
            <br />
            Now you can login.
          </div>
        )}
        {error && (
          <div className="text-center text-[0.8em] font-bold">
            An error has occurred.
            <br />
            Please try again later
          </div>
        )}
      </div>
    </div>
  );
}
