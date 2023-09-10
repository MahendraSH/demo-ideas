import prismadb from "@/lib/prismadb";
import { AwardIcon } from "lucide-react";
import { FC } from "react";
import ProductForm from "./components/product-form";
import { redirect } from "next/navigation";

interface newProductsPageProps {
  params: { productId: string; storeId: string };
}

const newProductsPage: FC<newProductsPageProps> = async ({ params }) => {
  const categorys = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  if (!categorys) {
    redirect(`/${params.storeId}/categorys`);
  }
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  if (!sizes) {
    redirect(`/${params.storeId}/sizes`);
  }
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  if (!colors) {
    redirect(`/${params.storeId}/colors`);
  }

  if (params.productId === "new") {
    return (
      <div className=" flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6 ">
          <ProductForm
            intialData={null}
            categorys={categorys}
            colors={colors}
            sizes={sizes}
          />
        </div>
      </div>
    );
  }
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  if (!product) {
    redirect("/");
  }
  return (
    <div className=" flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductForm
          intialData={product}
          categorys={categorys}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default newProductsPage;
