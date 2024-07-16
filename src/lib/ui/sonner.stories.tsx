import { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./toaster";
import { Button } from "./button";
import { toast } from "sonner";

const meta: Meta = {
  title: "UI/Sonner",
  component: Toaster,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  ),
};

Default.args = {};
