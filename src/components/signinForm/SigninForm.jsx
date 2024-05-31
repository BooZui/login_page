"use client";

import { useState } from "react";
import styles from "./signinForm.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SigninForm({ containerActive }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', {email, password, callbackUrl: '/'});

    setLoginInProgress(false);
  }

  return (
    <div
      className={
        (containerActive === "active"
          ? "translate-x-full"
          : "translate-x-0") +
        " absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-[2]"
      }
    >
      <div className="relative flex flex-col items-center w-full h-2/5 justify-end">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <button
        className="flex items-center mb-1 justify-center bg-[#ccc] rounded-lg mt-1 px-1 py-1"
        onClick={async () => await signIn('google', {callbackUrl: "/"})}
        >
          <Image src="/google.png" alt={""} width={24} height={24}/>
          <span className="text-[14px] font-bold">Login with Google</span>
        </button>
        <span className="text-[12px]">or use email for password</span>
      </div>
      <form className="bg-white flex items-center justify-start flex-col px-[40px] h-2/ pt-4" onSubmit={handleFormSubmit}>
        <input
          className="bg-[#eee] w-full border-none my-2 mx-0 px-3 py-2 text-[13px] rounded-xl"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled={loginInProgress}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          className="bg-[#eee] w-full border-none my-2 mx-0 px-3 py-2 text-[13px] rounded-xl"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={event => setPassword(event.target.value)}
        />
        <Link href={"/"} className="text-[13px] text-[#333] my-2 mx-3">
          Forget Your Password
        </Link>
        <button className="text-[13px] bg-[#512da8] text-white py-[0.625em] px-[2.8125em] border-[1px] border-solid border-transparent rounded-[8px] font-semibold tracking-[0.5px] uppercase mt[0.625em] cursor-pointer">
          Sign In
        </button>
      </form>
    </div>
  );
}
