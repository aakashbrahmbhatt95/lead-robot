import { useState } from "react";
import { ChevronDown, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/lib/ui/button";
import { Sheet } from "@/lib/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { useAppSelector } from "../../../redux/store";
import AttributePopup from "../../../components/Attributes/AttributePopup";

const MapComboBox = ({ value, onChange, disabled, error }: any) => {
  const [open, setOpen] = useState(false);
  const [isAttributePopup, setIsAttributePopup] = useState<any>(null);
  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={`w-full justify-between ${error ? "border-red-500" : ""}`}
          >
            {value
              ? attributesList.find((ele: any) => ele.key === value)?.label
              : "Select an attribute"}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search attribute..." className="h-9" />
            <CommandList>
              <p
                className="text-sm font-normal text-[#18181B] p-[10px] border-b-[1px] border-[lightgray] cursor-pointer"
                onClick={() => setIsAttributePopup("add")}
              >
                Create new attribute
              </p>
              <CommandGroup>
                <p className="m-2 text-sm font-normal text-[#18181B]">
                  Suggestions
                </p>
                {attributesList.map((ele: any) => (
                  <CommandItem
                    className="bg-black text-white m-2 mt-3"
                    key={ele?.key}
                    value={ele?.label}
                    onSelect={() => {
                      onChange(ele.key);
                      setOpen(false);
                    }}
                  >
                    {ele?.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === ele?.key ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>No attribute found</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
        <Sheet open={isAttributePopup !== null}>
          {isAttributePopup !== null && (
            <AttributePopup
              isAttributePopup={isAttributePopup}
              setIsAttributePopup={setIsAttributePopup}
            />
          )}
        </Sheet>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default MapComboBox;
