import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface NewSizeLayoutProps {
  children: React.ReactNode;
  params: { sizeId: string };
}

const NewSizeLayout: FC<NewSizeLayoutProps> = async ({ children, params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (params.sizeId.length < 24 && params.sizeId !== "new") {
    redirect("/");
  }

  return <>{children}</>;
};

export default NewSizeLayout;
