import { Button } from "@/lib/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";

const LanguageSelection = ({ formik }: any) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { languageList }: any = useAppSelector(
    (state: any) => state.globalReducer
  );

  const handleLanguageSelect = (language: string) => {
    formik.setFieldValue("language", language);
    setIsLanguageOpen(false);
  };

  return (
    <Popover open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>{formik.values.language || "Language"}</span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandList>
            <CommandGroup>
              {languageList.map((language: any) => (
                <CommandItem
                  key={language.key}
                  value={language[1] || ""}
                  onSelect={() => handleLanguageSelect(language[1] || "")}
                  className="m-2 mt-3"
                >
                  {language[1]}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>No language found</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelection;
