import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetContentProps,
} from "./sheet";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
};

export default meta;

const Template: React.FC<SheetContentProps> = (args) => (
  <Sheet>
    <SheetTrigger asChild>
      <button className="btn-primary">Open Sheet</button>
    </SheetTrigger>
    <SheetContent {...args}>
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>This is a description.</SheetDescription>
      </SheetHeader>
      <div className="content">
        <p>This is the sheet content.</p>
      </div>
      <SheetFooter>
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save</button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

type Story = StoryObj<SheetContentProps>;

export const Default: Story = {
  render: () => <Template side="right" />,
};

export const LeftSideSheet: Story = {
  render: () => <Template side="left" />,
};

export const TopSideSheet: Story = {
  render: () => <Template side="top" />,
};

export const BottomSideSheet: Story = {
  render: () => <Template side="bottom" />,
};
