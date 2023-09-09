"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActon from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumns = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At ",
  },
  {
    id: "actions",
    cell :( {row}) => <CellActon data={row.original}/>
  },
];
