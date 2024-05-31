// components/Layout.tsx
import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar/index";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
       <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 mt-[48px] overflow-scroll">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
