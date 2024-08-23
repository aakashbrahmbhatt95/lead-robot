"use client";

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

const MapComboBox = () => {
  const [open, setOpen] = useState(false);
  const [isAttributePopup, setIsAttributePopup] = useState<any>(null);
  const [value, setValue] = useState("");
  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? attributesList.find((ele: any) => ele.label === value)?.label
            : "Select"}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {ele?.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === ele?.label ? "opacity-100" : "opacity-0"
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
  );
};

export default MapComboBox;
