import { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta: Meta = {
  title: "UI/Switch",
  component: Switch,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => <Switch {...args} />,
  args: {},
};

export const Checked: Story = {
  render: (args) => <Switch {...args} defaultChecked />,
  args: {},
};

export const Disabled: Story = {
  render: (args) => <Switch {...args} disabled />,
  args: {},
};
