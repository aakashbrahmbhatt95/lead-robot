"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import List from "../../../public/List.svg";
import DotsThree from "../../../public/DotsThree.svg";
import { Button } from "@/lib/ui/button";
import { Checkbox } from "@/lib/ui/checkbox";
import { ChevronRight } from "lucide-react"
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
import { useRouter } from "next/navigation";
import { deleteCampaignsAction } from "@/redux/action/campaigns-action";
import { contactRowData } from "./helper";

export const columns: any = (handleAction: any) => [
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
    accessorKey: "contactName",
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div>
        <p>{row.original.contactName}</p>
        <p className="mt-2">{row.original.contactNumber}</p>
      </div>
    ),
  },
  {
    accessorKey: "campaigns",
    header: "Campaigns",
    cell: ({ row }: any) => <div className="flex items-center">{row.getValue("campaigns")}<ChevronRight /></div>,
  },
  {
    accessorKey: "lastCalled",
    header: "Last Called",
    cell: ({ row }: any) => <div>{row.getValue("lastCalled")}</div>,
  },
  {
    accessorKey: "callcount",
    header: "Call Count",
    cell: ({ row }: any) => <div>{row.getValue("callcount")}</div>,
  },
  {
    accessorKey: "attributes",
    header: "Attributes",
    cell: ({ row }: any) => (
      <div>
        <span className="bg-black text-white px-3 py-1 rounded">
          {row.getValue("attributes")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }: any) => (
      <div>
        <span className="bg-[#10B981] text-white px-3 py-1 rounded">
          {row.getValue("tags")}
        </span>
      </div>
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
  selectedMenuBar: any;
}> = ({ selectedMenuBar }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filteredContactsList, setFilteredContactsList] = useState<any>([]);

  useEffect(() => {
    const temp =
      selectedMenuBar === 1
        ? contactRowData?.filter((ele: any) => ele.is_active === true)
        : contactRowData?.filter((ele: any) => ele.is_active === false);
    setFilteredContactsList(temp);
  }, [selectedMenuBar, contactRowData]);

  const handleAction = (actionType: string, rowData: any) => {
    if (actionType === "edit") {
      router.push(`/campaigns/${rowData?.id}`);
    } else if (actionType === "delete") {
      dispatch(deleteCampaignsAction(rowData?.id));
    }
  };

  const table = useReactTable({
    data: filteredContactsList,
    columns: columns(handleAction),
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
        <Button variant="outline" className="cursor-pointer h-full rounded">
          <Image src={List} alt="List" />
        </Button>
        <Button className="h-[24px] py-0 px-3 rounded">All</Button>
        <Button className="h-[24px] py-0 px-3 rounded bg-[#E4E4E7] text-[#18181B]">
          Clear all
        </Button>
        <Button className="h-[24px] py-0 px-3 rounded">Campaign</Button>
        <Button className="h-[24px] py-0 px-3 rounded">Attributes</Button>
        <Button className="h-[24px] py-0 px-3 rounded">Tag</Button>
        <Button className="h-[24px] py-0 px-3 rounded">Disposition</Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
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
