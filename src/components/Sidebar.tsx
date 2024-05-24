// components/Sidebar.tsx
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#f4f4f5] text-black p-4 fixed top-0 left-0 h-full mt-[48px] py-5">
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
