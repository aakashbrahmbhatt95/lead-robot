"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import MultiSelect from "@/components/MultiSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const SearchFilter: NextPage = () => {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [campaignTags, setCampaignTags] = useState<string[]>([]);
  const [attributeTags, setAttributeTags] = useState<string[]>([]);

  const updateData = () => {
    setResults(["List Item 1", "List Item 2", "List Item 3"]);
    setSuggestions(["List Item 4", "List Item 5", "List Item 6"]);
    setCampaignTags(["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6"]);
    setAttributeTags(["Tag 7", "Tag 8", "Tag 9", "Tag 10", "Tag 11", "Tag 12"]);
  };

  const handleCheckboxChange = (value: string) => {
    setCheckedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    updateData();
  }, []);

  const handleTagClick = (tag: string) => {
    setCheckedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((item) => item !== tag)
        : [...prevTags, tag]
    );
  };

  const handleDeleteTag = (tag: string) => {
    setCheckedTags((prevTags) => prevTags.filter((item) => item !== tag));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 w-full">
      <div className="flex items-start gap-4 w-full">
        <div className="relative w-[600px] px-4">
          <Command className="">
            <CommandInput placeholder="Search" className="" />
            <div className="flex items-center gap-4 mt-4 px-4">
              {checkedTags.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge className="h-[30px] rounded-[4px] flex items-center gap-4">
                    <span className="whitespace-nowrap">{tag}</span>
                    <button onClick={() => handleDeleteTag(tag)}>x</button>
                  </Badge>
                </div>
              ))}
            </div>
            <CommandGroup heading="Results">
              <CommandList>
                {results.map((result, index) => (
                  <CommandItem key={index} className="flex justify-between">
                    {result}
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={checkedItems.includes(result)}
                      onChange={() => handleCheckboxChange(result)}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Suggestions">
              <CommandList>
                {suggestions.map((suggestion, index) => (
                  <CommandItem key={index} className="flex justify-between">
                    {suggestion}
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={checkedItems.includes(suggestion)}
                      onChange={() => handleCheckboxChange(suggestion)}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
            <div className="flex flex-col mt-4 gap-4 p-4">
              <p>Campaign Tags</p>
              <div className="flex items-center gap-3">
                {campaignTags.map(
                  (tag, index) =>
                    !checkedTags.includes(tag) && (
                      <Badge
                        key={index}
                        className="h-[30px] rounded-[4px]"
                        onClick={() => handleTagClick(tag)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {tag}{" "}
                      </Badge>
                    )
                )}
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-4 p-4">
              <p>Attribute Tags</p>
              <div className="flex items-center gap-3">
                {attributeTags.map(
                  (tag, index) =>
                    !checkedTags.includes(tag) && (
                      <Badge
                        key={index}
                        className="h-[30px] rounded-[4px]"
                        onClick={() => handleTagClick(tag)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {tag}{" "}
                      </Badge>
                    )
                )}
              </div>
            </div>
          </Command>
          <div className="flex justify-end mt-4">
            <Button>Select</Button>
          </div>
        </div>
        <button className="h-[42px] w-[150px] rounded-[6px] border border-slate-200  text-black bg-white ">
          Clear All
        </button>
        <div>
          <MultiSelect
            options={["Filter 1", "Filter 2", "Filter 3", "Filter 4"]}
          />
        </div>
      </div>
    </main>
  );
};

export default SearchFilter;
