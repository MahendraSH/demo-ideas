"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ColorColumns, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumns[] | [];
}

const ColorClient: FC<ColorClientProps> = ({ data = [] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Colors (${data?.length}) `}
          description="Manage Colors for your store "
        />
        <Button
          className="flex items-center  justify-between"
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="h-4 w-4 mr-2   " />
          Add new
        </Button>
      </div>

      <Separator />
      <DataTable searchKeyWord={"name"} columns={columns} data={data} />
      <Separator />
      <Heading title="API " description="API calls  for Colors" />
      <ApiList entityName="colors" entityId="colorId" />
    </>
  );
};

export default ColorClient;
