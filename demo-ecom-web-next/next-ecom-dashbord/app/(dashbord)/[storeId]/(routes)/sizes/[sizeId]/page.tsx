import prismadb from "@/lib/prismadb";
import { FC } from "react";
import SizeForm from "./components/size-form";
import { redirect } from "next/navigation";

interface newSizesPageProps {
  params: { sizeId: string };
}

const newSizesPage: FC<newSizesPageProps> = async ({ params }) => {
  if (params.sizeId === "new") {
    return (
      <div className=" flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6 ">
          <SizeForm intialData={null} />
        </div>
      </div>
    );
  }
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  if (!size) {
    redirect("/");
  }
  return (
    <div className=" flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SizeForm intialData={size} />
      </div>
    </div>
  );
};

export default newSizesPage;
