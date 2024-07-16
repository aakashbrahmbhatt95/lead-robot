import React, { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen max-w-screen overflow-hidden">
      <div className="min-w-[111px]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        <main className="flex-1 mt-[48px] p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
