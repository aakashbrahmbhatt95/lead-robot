import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import { useEffect, useState } from "react";
import Image from "next/image";
import PlusWhite from "../../../public/Plus-white.svg";
import { Dialog, DialogTrigger } from "@/lib/ui/dialog";
import { Button } from "@/lib/ui/button";
import { campaignMenuBar } from "@/components/CampaignsList/helper";
import { useRouter } from "next/navigation";
import ContactTable from "./contactTable";
import ContactPopup from "@/lib/modals/ContactPopup";

const Contacts = () => {
  const router = useRouter();
  const [selectedMenuBar, setSelectedMenuBar] = useState(1);
  const [isContactPopup, setIsContactPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!isContactPopup) {
      setSelectedMenuBar(1);
    }
  }, [isContactPopup]);

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
        <Dialog open={isContactPopup} onOpenChange={setIsContactPopup}>
          <DialogTrigger asChild onClick={() => setIsContactPopup(true)}>
            <Button variant="primary" style={{border: '1px solid black'}}>+ Create Contact</Button>
          </DialogTrigger>
          <ContactPopup
            selectedMenuBar={selectedMenuBar}
            setSelectedMenuBar={setSelectedMenuBar}
            setIsContactPopup={setIsContactPopup}
          />
        </Dialog>
      </div>
      <ContactTable selectedMenuBar={selectedMenuBar} />
    </>
  );
};

export default Contacts;
