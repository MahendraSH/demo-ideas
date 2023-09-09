import { format } from "date-fns";
import { FC } from "react";
import BillbordClient from "./components/billbordClient";
import prismadb from "@/lib/prismadb";

interface BillbordPageProps {
  params: { storeId: string };
}

const BillbordPage: FC<BillbordPageProps> = async ({ params }) => {
  const billbords = await prismadb.billbord.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedData = billbords.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillbordClient data={formatedData} />
      </div>
    </div>
  );
};

export default BillbordPage;
