import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Checkbox } from "@/lib/ui/checkbox";
import { ChevronDown } from "lucide-react";

export const MultiSelect = ({ field, options, setFieldValue }: any) => {
  const handleCheckboxChange = (option: any) => {
    const newValue = field.value.includes(option)
      ? field.value.filter((item: any) => item !== option)
      : [...field.value, option];

    setFieldValue(field.name, newValue);
  };

  return (
    <Popover>
      <PopoverTrigger className="flex justify-between mt-1 border border-gray px-3 py-2 rounded-md w-[250px]">
        {field.value.length > 0 ? field.value.join(", ") : "Select"}
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-2 bg-white shadow-md rounded-lg">
        {options.map((option: any) => (
          <div key={option} className="flex items-center gap-3 mt-2">
            <Checkbox
              checked={field.value.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
