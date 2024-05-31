"use client";
import React from "react";
import { createContext, useState, useContext } from "react";
import { SessionProvider } from "next-auth/react";

const GlobalSideStatus = createContext();

export function useGlobalSideStatus() {
  return useContext(GlobalSideStatus);
}

export function GlobalProvider({ children }) {
  return (
    <SessionProvider>
      <GlobalSideStatus.Provider>
          {children}
      </GlobalSideStatus.Provider>
    </SessionProvider>
  );
}
