import * as React from "react";
import { Meta } from "@storybook/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./pagination";

export default {
  title: "UI/Pagination",
  component: Pagination,
} as Meta;

export const Default = () => (
  <Pagination className="my-4">
    <PaginationContent>
      <PaginationPrevious href="#" />
      <PaginationItem>
        <PaginationLink href="#" isActive>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>
        <PaginationLink href="#">10</PaginationLink>
      </PaginationItem>
      <PaginationNext href="#" />
    </PaginationContent>
  </Pagination>
);
