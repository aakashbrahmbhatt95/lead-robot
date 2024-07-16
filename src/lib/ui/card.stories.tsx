import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {},
};

export default meta;

type Story = StoryObj<{ children: React.ReactNode }>;

export const Default: Story = {
  render: (args) => <Card>{args.children}</Card>,
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </>
    ),
  },
};

export const WithDifferentContent: Story = {
  render: (args) => <Card>{args.children}</Card>,
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Title 2</CardTitle>
          <CardDescription>Description 2</CardDescription>
        </CardHeader>
        <CardContent>Content 2</CardContent>
        <CardFooter>Footer 2</CardFooter>
      </>
    ),
  },
};
