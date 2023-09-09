import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface NewCategoryLayoutProps {
  children: React.ReactNode;
  params: { categoryId: string };
}

const NewCategoryLayout: FC<NewCategoryLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (params.categoryId.length < 24 && params.categoryId !== "new") {
    redirect("/");
  }

  return <>{children}</>;
};

export default NewCategoryLayout;
