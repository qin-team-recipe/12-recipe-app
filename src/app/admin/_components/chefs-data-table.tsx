"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pencil } from "lucide-react";

import DeleteChefButton from "./delete-chef-button";

type Chef = {
  id: string;
  name: string;
  profile: string | null;
  profileImage: string | null;
  _count: {
    Recipe: number;
  };
};

export const columns: ColumnDef<Chef>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
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
    accessorKey: "name",
    header: "シェフ名",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "_count.Recipe",
    header: () => <div className="text-right">レシピ数</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original._count.Recipe}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger>
            <MoreHorizontal className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent align="end" className="p-2">
            <Command className="w-full">
              <CommandList>
                <CommandItem>
                  <Link href={`/admin/${row.original.id}/edit`}>
                    <button className="flex">
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>編集する</span>
                    </button>
                  </Link>
                </CommandItem>

                <CommandItem>
                  <Link href={`/admin/${row.original.id}/create-recipe`}>
                    <button className="flex">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 2.75H9L8.25 9.5H3.75L3 2.75Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.25 14H6.75V16.25H5.25V14Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.9999 2.75V11.75H11.2499C11.2327 8.98925 11.3879 6.1955 14.9999 2.75Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 11.75V16.25H14.25V14"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M6 9.5V14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>{" "}
                      <span>レシピを作成する</span>
                    </button>
                  </Link>
                </CommandItem>

                <CommandItem>
                  {/* // TODO: URLをコピーする */}
                  <Copy className="mr-2 h-4 w-4" />
                  <span>URLをコピーする</span>
                </CommandItem>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    },
  },
];

export function DataTableDemo({ data }: { data: Chef[] }) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
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
      <div className="flex items-center py-4">
        <div className="flex gap-2">
          <Input
            placeholder="シェフ名で検索"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          />
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <DeleteChefButton
              chefIds={table.getFilteredSelectedRowModel().rows.map((row) => row.original.id)}
              onSuccessfulDelete={() => {
                table.setRowSelection({});
              }}
            />
          )}
        </div>
        <Button variant="outline" className="ml-auto" onClick={() => router.push("/admin/create")}>
          シェフを作成する
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
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
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
