import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface NewProductLayoutProps {
  children: React.ReactNode;
  params: { productId: string };
}

const NewProductLayout: FC<NewProductLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (params.productId.length < 24 && params.productId !== "new") {
    redirect("/");
  }

  return <>{children}</>;
};

export default NewProductLayout;
