import * as React from "react";
import { Meta } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export default {
  title: "UI/Popover",
  component: Popover,
} as Meta;

export const Default = () => (
  <Popover>
    <PopoverTrigger>
      <button>Open Popover</button>
    </PopoverTrigger>
    <PopoverContent align="center">
      <p>This is the popover content.</p>
    </PopoverContent>
  </Popover>
);

export const WithCustomStyles = () => (
  <Popover>
    <PopoverTrigger>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Open Popover
      </button>
    </PopoverTrigger>
    <PopoverContent
      align="center"
      className="bg-gray-200 p-4 border border-gray-400 rounded-md"
    >
      <p>This is the popover content with custom styles.</p>
      <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md">
        Close
      </button>
    </PopoverContent>
  </Popover>
);
