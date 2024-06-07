"use client";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { SESSION_KEY } from "./constants";

interface ProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const session = getCookie(SESSION_KEY);
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedPage;
