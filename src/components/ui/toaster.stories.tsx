import { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./toaster";
import { Button } from "./button";
import { useToast } from "./use-toast";

const meta: Meta = {
  title: "UI/Toaster",
  component: Toaster,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

Default.args = {
  variant: "default",
};
