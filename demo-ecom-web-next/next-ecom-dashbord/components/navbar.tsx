import { UserButton } from "@clerk/nextjs";
import { FC } from "react";
import { MainNav } from "./main-nav";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className=" shadow-md shadow-zinc-600 ">
      <div className=" flex h-14 items-center px-4 ">
        <div>this is a store sector</div>
        <MainNav className="mx-6" />
        <div className=" ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
