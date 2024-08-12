"use client";

import * as React from "react";
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
import NewAttributePopup from "./MapAttributePopup";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const MapComboBox = () => {
  const [open, setOpen] = React.useState(false);
  const [isNewAttribute, setIsNewAttribute] = React.useState(false);
  const [value, setValue] = React.useState("");

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
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Name"}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search attribute..." className="h-9" />
          <CommandList>
            <p
              className="text-sm font-normal text-[#18181B] p-[10px] border-b-[1px] border-[lightgray] cursor-pointer"
              onClick={() => setIsNewAttribute(true)}
            >
              Create new attribute
            </p>
            <CommandGroup>
              <p className="m-2 text-sm font-normal text-[#18181B]">Suggestions</p>
              {frameworks.map((framework) => (
                <CommandItem
                  className="bg-black text-white m-2 mt-3"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>No attribute found</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
      <Sheet open={isNewAttribute}>
        {isNewAttribute && (
          <NewAttributePopup
            isNewAttribute={isNewAttribute}
            setIsNewAttribute={setIsNewAttribute}
          />
        )}
      </Sheet>
    </Popover>
  );
};

export default MapComboBox;
