"use client";

import { FC, Suspense } from "react";
import { useScrollTop } from "@/hooks/use-sroll-top";
import { cn } from "@/lib/utils";
import { ClerkLoading, SignInButton, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import LoaderSpiner from "@/components/ui/loader-spiner";

interface NavbarProps {
  isAuth: boolean;
}

const Navbar: FC<NavbarProps> = ({ isAuth }) => {
  const scrolled = useScrollTop();

  return (
    <>
      <div
        className={cn(
          "navbar z-40 fixed top-0  bg-background   ",
          scrolled &&
            " border-b shadow w shadow-slate-800  dark:shadow-gray-300"
        )}
      >
        <div className=" sm:justify-end md:justify-start  flex-1">
          <Logo sidebar={false} />
        </div>
        <div className="flex  ">
          <div className="menu menu-horizontal px-1 gap-x-3  ">
            {/* <NavLits isSidbar={false} /> */}
            <ClerkLoading>
              <div className="my-auto">
                <LoaderSpiner size={"default"} />
              </div>
            </ClerkLoading>
            {isAuth && <UserButton afterSignOutUrl="/" />}
            {!isAuth && (
              <>
                <SignInButton> login</SignInButton>
              </>
            )}
            <div className="mx-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
