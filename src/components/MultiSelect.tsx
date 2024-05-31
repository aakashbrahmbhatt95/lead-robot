"use client";
import { useState, MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDown } from "@phosphor-icons/react";
interface MultiSelectProps {
  options: string[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const toggleSelection = (
    event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    event.stopPropagation();
    if (value === "All") {
      setSelectAll((prev) => !prev);
      setSelectedItems((prev) => (selectAll ? [] : options));
    } else {
      setSelectedItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const removeSelectedItem = (value: string) => {
    setSelectedItems((prev) => prev.filter((item) => item !== value));
  };

  return (
    <div className="flex items-start gap-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative min-w-[150px] bg-white h-[36px] rounded-[6px] cursor-pointer">
            <div className="border p-2 flex items-center justify-center gap-4 rounded-[6px]">
              <span className="text-black">Filter</span>
              <CaretDown size={20} weight="light" className="dark:text-black" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full bg-white mt-1 border rounded-md shadow-lg">
          {options.map((value) => (
            <DropdownMenuItem
              key={value}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={(event) => toggleSelection(event, value)}
            >
              <input
                type="checkbox"
                className="custom-checkbox mr-2"
                checked={selectedItems.includes(value)}
                readOnly
              />
              <span className="">{value}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center flex-wrap gap-2">
        <Badge
          className={`h-[30px] cursor-pointer rounded-[4px] ${
            selectAll
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-[#dce2f1] dark:text-slate-500"
          }`}
          variant={"outline"}
          onClick={(event) => toggleSelection(event, "All")}
        >
          All
        </Badge>
        {selectedItems.map((item) => (
          <div key={item} className="flex items-center">
            <Badge className="h-[30px] rounded-[4px]">
              {item}
              <button
                className="ml-2 text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  removeSelectedItem(item);
                }}
              >
                ✕
              </button>
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
