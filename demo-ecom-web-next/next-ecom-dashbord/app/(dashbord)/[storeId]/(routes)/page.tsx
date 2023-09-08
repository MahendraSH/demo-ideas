import prismadb from "@/lib/prismadb";
import { FC } from "react";

interface DashbordPageProps {
  params: { storeId: string };
}

const DashbordPage: FC<DashbordPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div> Active Store :  {store?.name} !</div>;
};

export default DashbordPage;
