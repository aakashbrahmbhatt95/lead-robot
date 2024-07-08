"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import ProtectedPage from "@/utils/protectedPage";
import Layout from "@/components/Layout";

interface ProtectedWrapperProps {
  children: ReactNode;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  // Define your unprotected routes
  const notProtectedRoutes = ["/login", "/signup", "/forgot-password", "/account/password/reset/key"];

  // Check if the current route is not protected
  const isNotProtectedRoute = notProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isNotProtectedRoute) {
    return children;
  }

  return (
    <ProtectedPage>
      <Layout>
     {children}
     </Layout>
    </ProtectedPage>
  );
};

export default ProtectedWrapper;
