"use client";
import { useState, MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import caretdown from "../../public/CaretDown.svg";

interface MultiSelectProps {
  options: string[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const toggleSelection = (
    event: MouseEvent<HTMLDivElement>,
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
      <div className="relative min-w-[150px] bg-white h-[36px] rounded-[6px]">
        <div
          className="border p-2 cursor-pointer rounded-[6px] flex items-center justify-center gap-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-black">Filter</span>
          <Image
            src={caretdown}
            alt="Caret Down"
            width={12}
            height={12}
            className="ml-2"
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 bg-white border mt-1 w-full">
            {options.map((value) => (
              <div
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
                <span className="text-black"> {value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
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
                onClick={() => removeSelectedItem(item)}
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
