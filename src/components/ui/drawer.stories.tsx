import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a sample drawer description.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <button>Cancel</button>
          <button>OK</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
