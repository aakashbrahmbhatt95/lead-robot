import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";

const meta: Meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent {...args}>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

Default.args = {
  sideOffset: 4,
};
