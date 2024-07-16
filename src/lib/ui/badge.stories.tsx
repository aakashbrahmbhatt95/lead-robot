import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Badge, badgeVariants } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => <Badge>Default Badge</Badge>,
};

export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary Badge</Badge>,
};

export const Destructive: Story = {
  render: () => <Badge variant="destructive">Destructive Badge</Badge>,
};

export const Outline: Story = {
  render: () => <Badge variant="outline">Outline Badge</Badge>,
};
