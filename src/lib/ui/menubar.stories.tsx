// Menubar.stories.tsx
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from "./menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

const meta: Meta<typeof Menubar> = {
  title: "Components/ui/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File</MenubarItem>
          <MenubarItem>Open File</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Save</MenubarItem>
          <MenubarItem inset>Save As</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithSubMenu: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Zoom</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Zoom In</MenubarItem>
              <MenubarItem>Zoom Out</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
