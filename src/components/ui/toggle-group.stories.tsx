import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta: Meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
      <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
      <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
    </ToggleGroup>
  ),
};

Default.args = {};
