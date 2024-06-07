import { Meta, StoryObj } from "@storybook/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastProps,
  ToastActionElement,
} from "./toast";

const meta: Meta = {
  title: "UI/Toast",
  component: Toast,
};

export default meta;

type Story = StoryObj<ToastProps>;

export const Default: Story = {
  render: (args) => (
    <ToastProvider>
      <ToastViewport>
        <Toast {...args}>
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Description</ToastDescription>
          <ToastAction altText="action">Action</ToastAction>
          <ToastClose />
        </Toast>
      </ToastViewport>
    </ToastProvider>
  ),
};

Default.args = {
  variant: "default",
};

export const Destructive: Story = {
  render: (args) => (
    <ToastProvider>
      <ToastViewport>
        <Toast {...args} variant="destructive">
          <ToastTitle>Destructive Title</ToastTitle>
          <ToastDescription>Destructive Description</ToastDescription>
          <ToastAction altText="confirm">Confirm</ToastAction>
          <ToastClose />
        </Toast>
      </ToastViewport>
    </ToastProvider>
  ),
};
