import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Toggle Collapsible</CollapsibleTrigger>
      <CollapsibleContent>
        <p>This is the collapsible content.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
};
