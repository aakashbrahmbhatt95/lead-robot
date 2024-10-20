import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { ChevronDown, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

const TestLLM = () => {
  const [isEditName, setIsEditName] = useState(false);
  const [isTestPopover, setIsTestPopover] = useState(false);

  return (
    <div className="h-[80vh] flex flex-col justify-between">
      <div className="flex justify-between items-center mt-5 border-b-[2px] border-[#E4E4E7] pb-3">
        <div className="flex gap-2 items-center">
          <Popover open={isTestPopover} onOpenChange={setIsTestPopover}>
            <PopoverTrigger asChild>
              <ChevronDown width={16} height={16} />
            </PopoverTrigger>
            <PopoverContent className="w-[40] p-0 mt-2"  align="start">
              <p className="flex items-center gap-2 text-sm font-medium px-2 py-2 border-b-[1px] border-[lightgray] cursor-pointer">
                <Plus width={16} height={16} /> New Test
              </p>
              <p className="text-sm font-medium px-2 w-[200px] py-2 cursor-pointer">
                New test template
              </p>
              <p className="text-sm font-medium px-2 py-2 w-[200px] cursor-pointer">
                New test template
              </p>
            </PopoverContent>
          </Popover>
          {isEditName ? (
            <Input />
          ) : (
            <>
              <p>New test template</p>
              <Pencil
                width={16}
                height={16}
                onClick={() => setIsEditName(true)}
              />
            </>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Save width={16} height={16} onClick={() => setIsEditName(false)} />
          <Trash2 width={16} height={16} />
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <Input placeholder="Type your message here..." />
        <Button type="button">Send</Button>
      </div>
    </div>
  );
};

export default TestLLM;
