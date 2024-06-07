import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

const meta: Meta = {
  title: "UI/Skeleton",
  component: Skeleton,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
