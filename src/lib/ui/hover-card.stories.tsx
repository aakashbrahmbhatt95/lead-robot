import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";

const meta: Meta<typeof HoverCard> = {
  title: "Components/ui/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <HoverCard>
      <HoverCardTrigger>
        <button className="rounded-md border p-2">Hover over me</button>
      </HoverCardTrigger>
      <HoverCardContent {...args}>
        <div className="p-4">
          <h4 className="font-bold">HoverCard Content</h4>
          <p className="mt-2">This is some content inside the HoverCard.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  args: {},
};
