import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import { scheduleMenuBar } from "./Inbound/helper";
import { useState } from "react";
import Inbound from "./Inbound";
import Dynamic from "./dynamic";
import Outbound from "./outbound";

const Schedules = () => {
  const [selectedMenuBar, setSelectedMenuBar] = useState<any>("inbound");

  return (
    <div>
      <Menubar className="w-fit bg-[#F4F4F5] mt-10">
        {scheduleMenuBar?.map((ele: any, index: any) => (
          <MenubarMenu key={index}>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46]"
              style={{
                backgroundColor:
                  selectedMenuBar === ele?.value ? "white" : "#F4F4F5",
              }}
              onClick={() => setSelectedMenuBar(ele?.value)}
            >
              {ele?.text}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      {selectedMenuBar === "inbound" && <Inbound />}
      {selectedMenuBar === "outbound" && <Outbound />}
      {selectedMenuBar === "dynamic" && <Dynamic />}
    </div>
  );
};

export default Schedules;
