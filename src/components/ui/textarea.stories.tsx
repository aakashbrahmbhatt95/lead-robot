import { Meta, StoryObj } from "@storybook/react";
import { Textarea, TextareaProps } from "./textarea";

const meta: Meta = {
  title: "UI/Textarea",
  component: Textarea,
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = { render: (args) => <Textarea {...args} /> };

Default.args = {
  placeholder: "Enter text here",
};
