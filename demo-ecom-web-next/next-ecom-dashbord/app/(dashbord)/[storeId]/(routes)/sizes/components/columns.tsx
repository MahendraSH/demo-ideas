"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActon from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumns = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "value",
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
