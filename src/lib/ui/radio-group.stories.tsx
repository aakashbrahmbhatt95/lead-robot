import * as React from "react";
import { Meta } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

export default {
  title: "UI/Radio Group",
  component: RadioGroup,
} as Meta;

export const Default = () => (
  <RadioGroup defaultValue="option1" onChange={(value) => console.log(value)}>
    <RadioGroupItem value="option1">Option 1</RadioGroupItem>
    <RadioGroupItem value="option2">Option 2</RadioGroupItem>
    <RadioGroupItem value="option3">Option 3</RadioGroupItem>
  </RadioGroup>
);
