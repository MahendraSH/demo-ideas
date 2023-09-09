"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { BillbordColumns, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface BillbordClientProps {
  data: BillbordColumns[] | [];
}

const BillbordClient: FC<BillbordClientProps> = ({ data = [] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={`Billbords (${data?.length}) `}
          description="Manage billbords for your store "
        />
        <Button
          className="flex items-center  justify-between"
          onClick={() => router.push(`/${params.storeId}/billbords/new`)}
        >
          <Plus className="h-4 w-4 mr-2   " />
          Add new
        </Button>
      </div>

      <Separator />
      <DataTable columns={columns} data={data} />
      <Separator />
      <Heading title="API " description="API calls  for billbords" />
      <ApiList entityName="billbords" entityId="billbordId" />
    </>
  );
};

export default BillbordClient;
