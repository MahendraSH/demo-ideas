import prismadb from "@/lib/prismadb";
import { AwardIcon } from "lucide-react";
import { FC } from "react";
import CategoryForm from "./components/category-form";
import { redirect } from "next/navigation";

interface newCategorysPageProps {
  params: { categoryId: string };
}

const newCategorysPage: FC<newCategorysPageProps> = async ({ params }) => {
  if (params.categoryId === "new") {
    return (
      <div className=" flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6 ">
          <CategoryForm intialData={null} />
        </div>
      </div>
    );
  }
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  if (!category) {
    redirect("/");
  }
  return (
    <div className=" flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <CategoryForm intialData={category} />
      </div>
    </div>
  );
};

export default newCategorysPage;
