import { format } from "date-fns";
import { FC } from "react";
import ProductClient from "./components/productClient";
import prismadb from "@/lib/prismadb";
import { formater } from "@/lib/utils";

interface ProductPageProps {
  params: { storeId: string };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedData = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formater.format(item.price),
    category: item.category.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    size: item.size.name,
    color: item.size.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductClient data={formatedData} />
      </div>
    </div>
  );
};

export default ProductPage;
