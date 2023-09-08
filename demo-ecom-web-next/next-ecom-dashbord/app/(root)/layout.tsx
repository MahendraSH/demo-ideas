import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface MainPageLayoutProps {
  children: React.ReactNode;
}

const MainPageLayout: FC<MainPageLayoutProps> = async ({ children }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default MainPageLayout;
