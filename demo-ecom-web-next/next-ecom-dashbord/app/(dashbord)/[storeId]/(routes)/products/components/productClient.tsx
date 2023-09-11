"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ProductColumns, columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
  data: ProductColumns[] | [];
}

const ProductClient: FC<ProductClientProps> = ({ data = [] }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center ">
        <Heading
          title={` Products (${data?.length}) `}
          description="Manage  Products for your store "
        />
        <Button
          className="flex items-center  justify-between"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="h-4 w-4 mr-2   " />
          Add new 
        </Button>
      </div>

      <Separator />
      <DataTable searchKeyWord={"name"} columns={columns} data={data} />
      <Separator />
      <Heading title="API " description="API calls  for  Products" />
      <ApiList entityName="products" entityId="productId" />
    </>
  );
};

export default ProductClient;
