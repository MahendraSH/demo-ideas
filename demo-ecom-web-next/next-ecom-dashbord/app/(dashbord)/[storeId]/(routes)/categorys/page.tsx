import { format } from "date-fns";
import { FC } from "react";
import CategoryClient from "./components/categoryClient";
import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params: { storeId: string };
}

const CategoryPage: FC<CategoryPageProps> = async ({ params }) => {
  const Categorys = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedData = Categorys.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryClient data={formatedData} />
      </div>
    </div>
  );
};

export default CategoryPage;
