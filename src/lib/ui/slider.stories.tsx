import { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta: Meta = {
  title: "UI/Slider",
  component: Slider,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => <Slider defaultValue={[33]} max={100} step={1} />,
};
