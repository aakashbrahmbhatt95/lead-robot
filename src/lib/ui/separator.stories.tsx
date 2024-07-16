import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => <Separator {...args} />,
  args: {
    className: "",
    orientation: "horizontal",
    decorative: true,
  },
};

export const Vertical: Story = {
  render: (args) => <Separator {...args} />,
  args: {
    className: "h-32",
    orientation: "vertical",
    decorative: true,
  },
};

export const HorizontalWithCustomClass: Story = {
  render: (args) => <Separator {...args} />,
  args: {
    className: "bg-blue-400",
    orientation: "horizontal",
    decorative: true,
  },
};

export const VerticalWithCustomClass: Story = {
  render: (args) => <Separator {...args} />,
  args: {
    className: "h-32 bg-blue-400",
    orientation: "vertical",
    decorative: true,
  },
};
