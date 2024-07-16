import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./context-menu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,

  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <button>Right-click me</button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuItem>Save File</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Option 1</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Option 2</ContextMenuCheckboxItem>
        <ContextMenuRadioGroup>
          <ContextMenuRadioItem value="1">Radio 1</ContextMenuRadioItem>
          <ContextMenuRadioItem value="2">Radio 2</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuLabel>Submenu</ContextMenuLabel>
        <ContextMenuSub>
          <ContextMenuItem>Submenu Item 1</ContextMenuItem>
          <ContextMenuItem>Submenu Item 2</ContextMenuItem>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
