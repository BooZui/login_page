"use client"
import { useEffect, useState } from "react"
import styles from "./toggleContainer.module.css"

export default function ToggleContainer({ containerStatus }) {
  const [containerActive, setContainerActive] = useState("");

  function addContainerActive() {
    setContainerActive("active");
  }

  function removeContainerActive() {
    setContainerActive("");
  }

  function sendContainerActive() {
    containerStatus(containerActive);
  }

  useEffect(() => {
    sendContainerActive();
  }, [containerActive])

  return (
    <div
        className={
          (containerActive === "active"
            ? "translate-x-[-100%] rounded-tl-[0] rounded-bl-[0] rounded-tr-[150px] rounded-br-[100px] md:rounded-tr-[100px] md:rounded-br-[75px]"
            : " rounded-tl-[150px] rounded-bl-[100px] md:rounded-tl-[100px] md:rounded-bl-[75px]") +
          " absolute top-0 left-1/2 w-1/2 h-[100%] overflow-hidden transition-all duration-[0.6s] ease-in-out z-[1000]"
        }
      >
        <div
          className={
            (containerActive === "active"
              ? "translate-x-[50%]"
              : "translate-x-0") +
            " bg-[#512da8] h-[100%] bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white relative left-[-100%] w-[200%] transition-all duration-[0.6s] ease-in-out"
          }
        >
          <div
            className={
              (containerActive === "active"
                ? "translate-x-0"
                : "translate-x-[-200%]") + " " + styles.toggle
            }
          >
            <h1>Welcome Back!</h1>
            <p>anything</p>
            <button
              className={styles.button + " bg-transparent border-white bg-[#512da8] text-white py-[10px] px-[45px] border-[1px] border-solid border-transparent rounded-[8px] font-semibold tracking-[0.5px] uppercase mt-[10px] cursor-pointer"}
              onClick={removeContainerActive}
            >
              Sign In
            </button>
          </div>
          <div
            className={
              (containerActive === "active"
                ? "translate-x-[200%]"
                : "translate-x-0") + " right-0 " + styles.toggle
            }
          >
            <h1>Welcome Back!</h1>
            <p>anything</p>
            <button
              className={styles.button + " bg-transparent border-white bg-[#512da8] text-white py-[10px] px-[45px] border-[1px] border-solid border-transparent rounded-[8px] font-semibold tracking-[0.5px] uppercase mt-[10px] cursor-pointer"}
              onClick={addContainerActive}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
  )
}