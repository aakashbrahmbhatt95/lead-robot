import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a sample dialog description.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Cancel</button>
          <button>OK</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
