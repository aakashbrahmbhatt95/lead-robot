import { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table";

const meta: Meta = {
  title: "UI/Table",
  component: Table,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Sample Table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>30</TableCell>
          <TableCell>johndoe@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Doe</TableCell>
          <TableCell>25</TableCell>
          <TableCell>janedoe@example.com</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell colSpan={2}>2 users</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  args: {},
};
