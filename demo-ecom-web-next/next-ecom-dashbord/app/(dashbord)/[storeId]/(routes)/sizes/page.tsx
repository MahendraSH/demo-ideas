import { format } from "date-fns";
import { FC } from "react";
import SizeClient from "./components/sizeClient";
import prismadb from "@/lib/prismadb";

interface SizePageProps {
  params: { storeId: string };
}

const SizePage: FC<SizePageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedData = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SizeClient data={formatedData} />
      </div>
    </div>
  );
};

export default SizePage;
