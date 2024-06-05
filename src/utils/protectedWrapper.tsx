"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import ProtectedPage from "@/utils/protectedPage";

interface ProtectedWrapperProps {
  children: ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  // Define your unprotected routes
  const notProtectedRoutes = ["/login","/signup"];

  // Check if the current route is not protected
  const isNotProtectedRoute = notProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isNotProtectedRoute) {
    return children;
  }

  return (
    <ProtectedPage>
     {children}
    </ProtectedPage>
  );
};

export default ProtectedWrapper;
