import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Calendar, CalendarProps } from "./calendar";

const meta: Meta<CalendarProps> = {
  title: "Components/Calendar",
  component: Calendar,
  args: {
    showOutsideDays: true,
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<CalendarProps>;

export const Default: Story = {
  args: {
    className: "rounded-md border",
  },
};
