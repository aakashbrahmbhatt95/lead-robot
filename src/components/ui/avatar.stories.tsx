import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/ui/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  ),
};

export const WithoutImage: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  ),
};
