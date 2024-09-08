import { Plus, Chat } from "@phosphor-icons/react";
import { Popover, PopoverTrigger, PopoverContent } from "@/lib/ui/popover";
import { DropdownItems } from "./DropdownItems";

const TaskSetPopover = ({ handleAddComponent }: any) => {
  return (
    <div className="w-full flex justify-center mt-4 relative">
      <Popover>
        <PopoverTrigger>
          <button>
            <Plus />
          </button>
        </PopoverTrigger>
        <PopoverContent className="bg-white border rounded shadow-lg p-2 flex justify-between items-center">
          <button
            className="px-4 rounded-md py-1 text-sm flex items-center gap-1"
            onClick={() => handleAddComponent("say", "")}
          >
            <Chat size={20} />
            <span>Say</span>
          </button>
          {DropdownItems("ask", handleAddComponent)}
          {DropdownItems("do", handleAddComponent)}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskSetPopover;
