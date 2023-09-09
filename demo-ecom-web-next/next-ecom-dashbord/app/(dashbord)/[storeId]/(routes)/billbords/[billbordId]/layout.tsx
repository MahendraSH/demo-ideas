import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface NewBillbordLayoutProps {
  children: React.ReactNode;
  params: { billbordId: string };
}

const NewBillbordLayout: FC<NewBillbordLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (params.billbordId.length < 24 && params.billbordId !== "new") {
    redirect("/");
  }

  return <>{children}</>;
};

export default NewBillbordLayout;
