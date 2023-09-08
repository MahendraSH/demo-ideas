import { UserButton, auth } from "@clerk/nextjs";
import { FC } from "react";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switecher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const items = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className=" shadow-md shadow-zinc-600 ">
      <div className=" flex h-14 items-center px-4 ">
        <StoreSwitcher items={items} />
        <MainNav className="mx-6" />
        <div className=" ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
