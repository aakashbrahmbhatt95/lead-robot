import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button>Open Dropdown</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Menu Item 1</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>
          Checkbox Item
        </DropdownMenuCheckboxItem>
        <DropdownMenuRadioItem value="1">Radio Item 1</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="2">Radio Item 2</DropdownMenuRadioItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Submenu</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Submenu Item</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Submenu Item 1</DropdownMenuItem>
              <DropdownMenuItem>Submenu Item 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuShortcut>Ctrl + S</DropdownMenuShortcut>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
