"use client";

import { FC } from "react";

import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-sroll-top";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

import { MenuIcon } from "lucide-react";
import NavbarRoutes from "./navbar-routes";
interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "navbar   fixed top-0  bg-background   ",
        scrolled && " border-b   w-full"
      )}
    >
      <div className="flex-none lg:hidden  ">
        <Button size={"icon"} variant={"ghost"}>
          <label htmlFor="my-drawer-3" aria-label="open sidebar" className=" ">
            <MenuIcon className=" w-5 h-6  mr-2 " />
          </label>
        </Button>
        <Logo sidebar={false} />
      </div>
      <div className=" flex-none  fixed right-2 top-1">
        <div className="  flex flex-row space-x-4  sm:spae-0  py-1   ">
          {/* Navbar menu content here */}
          <NavbarRoutes />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
