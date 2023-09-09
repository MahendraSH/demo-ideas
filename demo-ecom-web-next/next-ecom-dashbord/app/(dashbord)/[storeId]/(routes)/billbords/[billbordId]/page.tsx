import prismadb from "@/lib/prismadb";
import { AwardIcon } from "lucide-react";
import { FC } from "react";
import BillbordForm from "./components/biillbord-form";
import { redirect } from "next/navigation";

interface newBillbordsPageProps {
  params: { billbordId: string };
}

const newBillbordsPage: FC<newBillbordsPageProps> = async ({ params }) => {
  if (params.billbordId === "new") {
    return (
      <div className=" flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6 ">
          <BillbordForm intialData={null} />
        </div>
      </div>
    );
  }
  const billbord = await prismadb.billbord.findUnique({
    where: {
      id: params.billbordId,
    },
  });
  if (!billbord) {
    redirect("/");
  }
  return (
    <div className=" flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillbordForm intialData={billbord} />
      </div>
    </div>
  );
};

export default newBillbordsPage;
