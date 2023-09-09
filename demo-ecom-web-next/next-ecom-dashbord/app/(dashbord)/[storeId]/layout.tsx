import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface DashbordLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

const DashbordLayout: FC<DashbordLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (params.storeId.length < 24) {
    redirect("/");
  }
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashbordLayout;
