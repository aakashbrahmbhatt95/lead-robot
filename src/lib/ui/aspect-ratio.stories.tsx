import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/ui/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className="bg-gray-200  border border-black">
      <div className="flex items-center justify-center h-full w-full">
        16:9 Aspect Ratio
      </div>
    </AspectRatio>
  ),
};

export const Square: Story = {
  render: () => (
    <AspectRatio
      ratio={1}
      className="bg-gray-200  border border-black
 "
    >
      <div className="flex items-center justify-center h-full w-full">
        1:1 Aspect Ratio
      </div>
    </AspectRatio>
  ),
};
