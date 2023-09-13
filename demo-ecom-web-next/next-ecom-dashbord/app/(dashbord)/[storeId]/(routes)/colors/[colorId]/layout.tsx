import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface NewColorLayoutProps {
  children: React.ReactNode;
  params: { colorId: string };
}

const NewColorLayout: FC<NewColorLayoutProps> = async ({
  children,
  params,
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  if (params.colorId.length < 24 && params.colorId !== "new") {
    redirect("/");
  }

  return <>{children}</>;
};

export default NewColorLayout;
