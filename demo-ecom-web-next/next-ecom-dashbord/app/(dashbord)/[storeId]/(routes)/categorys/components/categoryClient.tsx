"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CategoryColumns, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
  data: CategoryColumns[] | [];
}

const CategoryClient: FC<CategoryClientProps> = ({ data = [] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Categorys (${data?.length}) `}
          description="Manage Categorys for your store "
        />
        <Button
          className="flex items-center  justify-between"
          onClick={() => router.push(`/${params.storeId}/categorys/new`)}
        >
          <Plus className="h-4 w-4 mr-2   " />
          Add new Category
        </Button>
      </div>

      <Separator />
      <DataTable columns={columns} data={data} />
      <Separator />
      <Heading title="API " description="API calls  for Categorys" />
      <ApiList entityName="Categorys" entityId="CategoryId" />
    </>
  );
};

export default CategoryClient;
