import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof Button> = {
  title: "Components/ui/button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "sm",
    disabled: false,
    onClick: action("default click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "sm",
    disabled: false,
    onClick: action("primary click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    disabled: false,
    onClick: action("primary click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    disabled: false,
    onClick: action("secondary click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "sm",
    disabled: false,
    onClick: action("secondary click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "sm",
    disabled: false,
    onClick: action("secondary click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Large: Story = {
  args: {
    variant: "default",
    size: "lg",
    disabled: false,
    onClick: action("large click"),
    children: "button",
    className: "shadow-lg",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    size: "sm",
    disabled: true,
    onClick: action("disabled click"),
    children: "button",
    className: "shadow-lg",
  },
};
