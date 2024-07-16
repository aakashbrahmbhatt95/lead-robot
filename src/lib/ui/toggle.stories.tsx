import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Toggle, toggleVariants } from "./toggle";

const meta: Meta = {
  title: "UI/Toggle",
  component: Toggle,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => <Toggle {...args}>Toggle</Toggle>,
};

Default.args = {};

export const Outline: Story = {
  render: (args) => <Toggle {...args}>Toggle</Toggle>,
};

Outline.args = {
  variant: "outline",
};

export const SmallSize: Story = {
  render: (args) => <Toggle {...args}>Toggle</Toggle>,
};

SmallSize.args = {
  size: "sm",
};

export const LargeSize: Story = {
  render: (args) => <Toggle {...args}>Toggle</Toggle>,
};

LargeSize.args = {
  size: "lg",
};
