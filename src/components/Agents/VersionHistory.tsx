import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";

const VersionHistory = () => {
  return (
    <div className="border-[1px] p-3 border-[#E4E4E7] rounded">
      <p className="font-medium pb-2 border-b-[1px] border-[#E4E4E7]">
        Version History
      </p>
      {[1, 2, 3, 4, 5]?.map((ele: any) => {
        return (
          <div className="flex border-b-[1px] mt-2 border-[#E4E4E7]">
            <div className="w-3/4 flex flex-col gap-2 py-2">
              <p className="text-sm font-semibold">15-05-23 - 13:21</p>
              <p className="font-medium text-xs">David [agent name]</p>
              <p className="font-medium text-xs">Voice - Devon</p>
            </div>
            <div className="w-1/4 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Restore</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VersionHistory;
