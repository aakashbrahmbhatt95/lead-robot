import { useState } from "react";
import { SidebarContext, SidebarItem } from "./SidebarItem";
import Group3 from "../../../public/Group3.png";
import Group4 from "../../../public/Group4.png";
import Group5 from "../../../public/Group5.png";
import CaretDoubleLeft from "../../../public/CaretDoubleLeft.png";
import CaretDoubleRight from "../../../public/CaretDoubleRight.png";
import Image from "next/image";
import SecondarySidebar from "./SecondarySidebar";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [showSecondarySidebar, setShowSecondarySidebar] =
    useState<boolean>(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(
    null
  );
  const [secondarySidebarArray, setSecondarySidebarArray] = useState<any>([]);

  const handleSidebarItemClick = (text: string) => {
    if (activeSidebarItem === text) {
      setShowSecondarySidebar((prevState) => !prevState);
    } else {
      setShowSecondarySidebar(true);
    }
    setActiveSidebarItem(text);
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
            <SidebarItem
              text="Dashboard"
              icon={<Image src={Group3} alt="" width={20} height={20} />}
              active={activeSidebarItem === "Dashboard" ? true : false}
              handleSidebarItemClick={handleSidebarItemClick}
            />
            <SidebarItem
              text="Insights"
              icon={<Image src={Group4} alt="" items-center />}
              handleSidebarItemClick={handleSidebarItemClick}
              active={activeSidebarItem === "Insights" ? true : false}
            />
            <SidebarItem
              text="AI Agents"
              icon={<Image src={Group3} alt="" width={20} height={20} />}
              handleSidebarItemClick={handleSidebarItemClick}
              active={activeSidebarItem === "AI Agents" ? true : false}
            />
            <SidebarItem
              text="Campaigns"
              icon={<Image src={Group4} alt="" width={20} height={20} />}
              handleSidebarItemClick={handleSidebarItemClick}
              active={activeSidebarItem === "Campaigns" ? true : false}
            />
            <SidebarItem
              text="Settings"
              icon={<Image src={Group5} alt="" width={20} height={20} />}
              handleSidebarItemClick={handleSidebarItemClick}
              active={activeSidebarItem === "Settings" ? true : false}
            />
          </ul>
        </SidebarContext.Provider>
      </nav>
      {showSecondarySidebar && (
        <SecondarySidebar setShowSecondarySidebar={setShowSecondarySidebar} />
      )}
    </aside>
  );
};

export default Sidebar;
