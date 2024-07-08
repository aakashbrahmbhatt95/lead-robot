import { useState } from "react";
import { SidebarContext, SidebarItem } from "./SidebarItem";
import Image from "next/image";
import SecondarySidebar from "./SecondarySidebar";
import CaretDoubleLeft from "../../../public/CaretDoubleLeft.png";
import CaretDoubleRight from "../../../public/CaretDoubleRight.png";
import { SideBarData } from "./helper";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState<any>(null);

  const handleSidebarItemClick = (ele: any) => {
    setActiveSidebarItem(ele);
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
              alt="CaretDoubleLeft"
              width={20}
              height={20}
            />
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4">
            {SideBarData?.map((ele) => {
              return (
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
                  active={activeSidebarItem?.text === ele?.text ? true : false}
                  handleSidebarItemClick={() => handleSidebarItemClick(ele)}
                />
              );
            })}
          </ul>
        </SidebarContext.Provider>
      </nav>
      {activeSidebarItem?.showSecondarySidebar && (
        <SecondarySidebar
          activeSidebarItem={activeSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
        />
      )}
    </aside>
  );
};

export default Sidebar;
