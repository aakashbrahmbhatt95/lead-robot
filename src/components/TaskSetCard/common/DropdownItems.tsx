import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { Question, Wrench } from "@phosphor-icons/react";

export const DropdownItems = (child: string, handleAddComponent: any) => {
  if (child === "ask") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
            <Question size={20} />
            <span>Ask</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleAddComponent("ask", "text")}>
              <span>Text</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddComponent("ask", "number")}
            >
              <span>Number</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddComponent("ask", "option")}
            >
              <span>Option</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("ask", "date")}>
              <span>Date</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddComponent("ask", "time")}>
              <span>Time</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddComponent("ask", "yesno")}
            >
              <span>Yes/No</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (child === "do") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
            <Wrench size={20} />
            <span>Do</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Call</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "end call")}
                >
                  <span>End Call</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "transfer call")}
                >
                  <span>Transfer Call</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Send Message</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "sms")}
                >
                  <span>SMS</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "email")}
                >
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Calendar</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "availability")}
                >
                  <span>Availability</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "book")}
                >
                  <span>Book</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "reschedule")}
                >
                  <span>Reschedule</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Campaign</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "addcampagin")}
                >
                  <span>Add</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "removecampaign")}
                >
                  <span>Remove</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Cancel</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => handleAddComponent("do", "cancel")}
                >
                  <span>Cancel</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAddComponent("do", "custom")}>
            Custom
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
