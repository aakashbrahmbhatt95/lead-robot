import * as React from "react";
import { Meta } from "@storybook/react";
import { Progress } from "./progress";

export default {
  title: "UI/Progress",
  component: Progress,
} as Meta;

export const Default = () => <Progress value={50} />;
