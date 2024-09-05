"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DotsThree from "../../../public/DotsThree.svg";
import { Button } from "@/lib/ui/button";
import { Checkbox } from "@/lib/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/dropdown-menu";
import { Input } from "@/lib/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  contactsListAction,
  deleteContactsAction,
} from "../../redux/action/contacts-action";
import { tagsListAction } from "../../redux/action/tags-action";
import { attributesListAction } from "../../redux/action/attributes-action";

const dynamicColumns = (attributesList: any) => attributesList.map((attribute: any) => ({
  accessorKey: attribute.key,
  header: attribute.label,
  cell: ({ row }: any) => <div>{row.original?.attributes?.[attribute.key]}</div>,
}));


export const columns: any = (handleAction: any, attributesList: any) => [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }: any) => <div>{row.original?.phone}</div>,
  },
  ...dynamicColumns(attributesList),
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }: any) =>
      row.original?.tags?.length ? (
        <div className="flex flex-wrap gap-2 items-center">
          {row.original?.tags?.map((ele: any) => {
            return (
              <span className="bg-[#10B981] text-white px-3 py-1 rounded">
                {ele}
              </span>
            );
          })}
        </div>
      ) : (
        ""
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-white hover:bg-white">
              <Image src={DotsThree} alt="DotsThree" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleAction("edit", row.original)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAction("delete", row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ContactTable: React.FC<{
  setIsEditContactPopup: any;
}> = ({ setIsEditContactPopup }) => {
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({});
  const [rowSelection, setRowSelection] = useState({});
  const { contactsList }: any = useAppSelector(
    (state: any) => state.contactReducer
  );
  const { attributesList }: any = useAppSelector(
    (state: any) => state.attributeReducer
  );

  useEffect(() => {
    dispatch(contactsListAction());
    dispatch(attributesListAction());
    dispatch(tagsListAction());
  }, []);

  const handleAction = (actionType: string, rowData: any) => {
    if (actionType === "edit") {
      setIsEditContactPopup(rowData);
    } else if (actionType === "delete") {
      dispatch(deleteContactsAction(rowData?.id));
    }
  };

  const table = useReactTable({
    data: contactsList,
    columns: columns(handleAction, attributesList),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-1">
        <Input
          placeholder="Search lists, attributes, tags"
          value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        <Button
          type="button"
          className="h-[24px] py-0 px-3 rounded bg-[#E4E4E7] text-[#18181B]"
          onClick={() => table?.getColumn("name")?.setFilterValue("")}
        >
          Clear all
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-black">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-black font-bold text-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
