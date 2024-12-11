import { Plus, Chat, Question } from "@phosphor-icons/react";
import { Popover, PopoverTrigger, PopoverContent } from "@/lib/ui/popover";
import { Wrench } from "lucide-react";

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
          <button
            className="px-4 rounded-md py-1 text-sm flex items-center gap-1"
            onClick={() => handleAddComponent("ask", "")}
          >
            <Question size={20} />
            <span>Ask</span>
          </button>
          <button
            className="px-4 rounded-md py-1 text-sm flex items-center gap-1"
            onClick={() => handleAddComponent("do", "")}
          >
            <Wrench size={20} />
            <span>Do</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskSetPopover;
