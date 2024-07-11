import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useState } from "react";
import Image from "next/image";
import PlusWhite from "../../../public/Plus-white.svg";
import { Button } from "@/components/ui/button";
import { campaignMenuBar } from "@/components/CampaignsList/helper";
import { DataTableDemo } from "./campaignsTable";
import { useRouter } from "next/navigation";

const CampaignsList = () => {
  const router = useRouter()
  const [selectedMenuBar, setSelectedMenuBar] = useState(1);
  return (
    <>
      <div className="flex justify-between mt-4">
        <Menubar className="w-fit bg-[#F4F4F5]">
          {campaignMenuBar?.map((ele: any, index: any) => {
            return (
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
            );
          })}
        </Menubar>
        <Button type="button" onClick={()=>router.push("/create-campaign/create")}>
          <Image src={PlusWhite} className="mr-2" alt="Logo" />
          Create campaign
        </Button>
      </div>
      <DataTableDemo />
    </>
  );
};

export default CampaignsList;
