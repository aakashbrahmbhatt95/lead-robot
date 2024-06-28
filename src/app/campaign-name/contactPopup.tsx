"use client";

import {
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useState } from "react";
import UploadCSV from "./UploadCSV";
import { menuBarArray } from "./helper";
import { Button } from "@/components/ui/button";
import MapAttribute from "./mapAttribute";
import CustomTags from "./customTags";
import Review from "./review";

const ContactPopup = () => {
  const [selectedMenuBar, setSelectedMenuBar] = useState(1);

  return (
    <DialogContent className="sm:max-w-[60%] max-h-[70%] overflow-scroll">
      <DialogHeader>
        <h2 className="text-3xl font-semibold text-black">{selectedMenuBar === 3 ? "Tag": "Add"} Contact</h2>
      </DialogHeader>
      <h4 className="text-sm font-medium text-[#18181B]">
        {selectedMenuBar === 1
          ? "CSV"
          : selectedMenuBar === 2
            ? "Map attributes"
            : selectedMenuBar === 3
              ? "Add custom tags"
              : "Review"}
      </h4>
      <Menubar className="w-fit bg-[#F4F4F5]">
        {menuBarArray?.map((ele: any, index: any) => {
          return (
            <MenubarMenu key={index}>
              <MenubarTrigger
                className="cursor-pointer text-[#3F3F46]"
                style={{
                  backgroundColor:
                    selectedMenuBar === ele?.value ? "white" : "#F4F4F5",
                }}
                onClick={() => setSelectedMenuBar(ele?.value)}
              >
                {ele?.text}
              </MenubarTrigger>
            </MenubarMenu>
          );
        })}
      </Menubar>
      {selectedMenuBar === 1 && <UploadCSV />}
      {selectedMenuBar === 2 && <MapAttribute />}
      {selectedMenuBar === 3 && <CustomTags />}
      {selectedMenuBar === 4 && <Review />}
      <div
        className="mt-3 flex justify-end gap-4 pr-2"
        style={{ width: selectedMenuBar === 1 ? "65%" : "100%" }}
      >
        {selectedMenuBar !== 1 && (
          <Button
            className="h-[36px] w-[56px] bg-white text-black hover:bg-white"
            onClick={() => {
              setSelectedMenuBar(
                selectedMenuBar === 2
                  ? 1
                  : selectedMenuBar === 3
                    ? 2
                    : selectedMenuBar === 4
                      ? 3
                      : 1
              );
            }}
          >
            Back
          </Button>
        )}
        <Button
          className="h-[36px] w-[56px]"
          onClick={() => {
            setSelectedMenuBar(
              selectedMenuBar === 1
                ? 2
                : selectedMenuBar === 2
                  ? 3
                  : selectedMenuBar === 3
                    ? 4
                    : 1
            );
          }}
        >
          {selectedMenuBar === 1
            ? "Next"
            : selectedMenuBar === 2
              ? "Map"
              : selectedMenuBar === 3
                ? "Tag"
                : "Next"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default ContactPopup;
