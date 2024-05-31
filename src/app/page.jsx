"use client";

import SignupForm from "@/components/signupForm/SignupForm";
import SigninForm from "@/components/signinForm/SigninForm";
import ToggleContainer from "@/components/toggleContainer/ToggleContainer";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Login() {
  const [containerActive, setContainerActive] = useState("");
  const { data, state } = useSession();

  if(data) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center bg-black text-white text-3xl font-bold">
        <div>Hello {data.user.email}</div>
        <button className="bg-[#ccc] rounded-full px-3 py-1 my-2" onClick={async () => await signOut()}>Logout</button>
      </div>
    );
  }

  function handleContainer(containerStatus) {
    setContainerActive(containerStatus);
  }

  return (
    <div className="absolute w-full h-full flex items-center justify-center text-black bg-[#c9d6ff] bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div className="relative bg-[#fff] rounded-[30px] shadow-container overflow-hidden w-[768px] max-w-[100%] min-h-[480px]">
        <SigninForm containerActive={containerActive} />
        <SignupForm containerActive={containerActive} />
        <ToggleContainer containerStatus={handleContainer} />
      </div>
    </div>
  );
}
