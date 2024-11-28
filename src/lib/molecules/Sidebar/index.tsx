import { useState } from "react";
import { SidebarContext, SidebarItem } from "./SidebarItem";
import Image from "next/image";
import CaretDoubleLeft from "@/../public/CaretDoubleLeft.png";
import CaretDoubleRight from "@/../public/CaretDoubleRight.png";
import { SideBarData } from "./helper";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/utils/http-util";

const Sidebar = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState<any>(null);
  const pathname = usePathname();
  const handleSidebarItemClick = (ele: any) => {
    setActiveSidebarItem((prev: any) =>
      prev?.text === ele?.text ? null : ele
    );
    if (ele?.url !== "") {
      router.push(ele?.url);
    }
  };

  return (
    <aside className={`h-[calc(100vh - 48px)] flex bg-[#f4f4f5] mt-[48px]`}>
      <nav
        className={`h-[100vh] flex flex-col border-r shadow-sm ${
          expanded ? "w-56" : "w-28"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setExpanded((curr) => !curr)}
            className="px-4 py-2 rounded-3xl bg-black w-full h-9 items-center flex justify-center"
          >
            <Image
              src={expanded ? CaretDoubleLeft : CaretDoubleRight}
              alt="Toggle Sidebar"
              width={20}
              height={20}
            />
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4">
            {SideBarData?.map((ele: any, index: any) => (
              <li key={index} className="mb-2">
                <SidebarItem
                  text={ele?.text}
                  icon={
                    <Image
                      src={ele?.icon}
                      alt={ele?.text}
                      width={20}
                      height={20}
                    />
                  }
                  active={activeSidebarItem?.text === ele?.text}
                  handleSidebarItemClick={() => handleSidebarItemClick(ele)}
                />
                {/* Accordion Dropdown */}
                {activeSidebarItem?.text === ele?.text &&
                  ele?.dropdownContent && (
                    <div className={`space-y-2 bg-white py-4`}>
                      {ele.dropdownContent.map((item: any, idx: any) => (
                        <button
                          key={idx}
                          className={`w-full text-left py-2 rounded-md 
                            ${pathname === item.url ? "bg-gray-200 font-semibold" : "bg-white hover:bg-gray-200"} 
                            ${expanded ? "px-4" : "pl-2 text-sm"}`}
                          onClick={() => {
                            if (item?.label === "Logout") {
                              logout();
                            } else {
                              router.push(item.url);
                            }
                          }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default Sidebar;
