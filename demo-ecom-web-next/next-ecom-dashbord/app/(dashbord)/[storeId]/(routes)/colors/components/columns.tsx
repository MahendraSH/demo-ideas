"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActon from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="border-2 border-secondary-foreground p-3 rounded-full"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At ",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActon data={row.original} />,
  },
];
