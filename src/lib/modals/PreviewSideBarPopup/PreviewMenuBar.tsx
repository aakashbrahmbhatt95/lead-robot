import { Menubar, MenubarMenu, MenubarTrigger } from "@/lib/ui/menubar";
import { MessageCircle, Phone } from "lucide-react";

const PreviewMenuBar = ({ menuBar, setMenuBar }: any) => {
  return (
    <Menubar className="w-full bg-[#F4F4F5] mt-10">
      <MenubarMenu>
        <MenubarTrigger
          className="cursor-pointer text-[#3F3F46] w-[50%]"
          style={{
            backgroundColor: menuBar === "testaudio" ? "white" : "#F4F4F5",
          }}
          onClick={() => setMenuBar("testaudio")}
        >
          <Phone width={16} height={16} className="mr-2" />
          Test Audio
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className="cursor-pointer text-[#3F3F46] w-[50%]"
          style={{
            backgroundColor: menuBar === "testllm" ? "white" : "#F4F4F5",
          }}
          onClick={() => setMenuBar("testllm")}
        >
          <MessageCircle width={16} height={16} className="mr-2" />
          Test LLM
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default PreviewMenuBar;
