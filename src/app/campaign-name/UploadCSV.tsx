import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useState } from "react";

const UploadCSV = () => {
  const [selectedImport, setSelectedImport] = useState(1);

  return (
    <div className="flex gap-4">
      <div className="w-[65%]">
        <div className="h-[284px] bg-[#FAFAFA]"></div>
        <p className="text-[#71717A] mt-3 text-sm font-normal">
          Phone number is a required field. View example CSV file.
        </p>
      </div>
      <div className="w-[35%]">
        <Menubar className="flex-col h-auto p-2">
          <MenubarMenu>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46] w-full"
              style={{
                backgroundColor: selectedImport === 1 ? "#F4F4F5" : "white",
              }}
              onClick={() => setSelectedImport(1)}
            >
              Import CSV
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46] w-full"
              style={{
                backgroundColor: selectedImport === 2 ? "#F4F4F5" : "white",
              }}
              onClick={() => setSelectedImport(2)}
            >
              Import CRM
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className="cursor-pointer text-[#3F3F46] w-full"
              style={{
                backgroundColor: selectedImport === 3 ? "#F4F4F5" : "white",
              }}
              onClick={() => setSelectedImport(3)}
            >
              Add Individual
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default UploadCSV;
