"use client";

import Footer from "@/components/footer";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";
import LoaderSpiner from "@/components/ui/loader-spiner";
import { useScrollTop } from "@/hooks/use-sroll-top";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { ExitIcon } from "@radix-ui/react-icons";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  // ((root))
  children,
}: {
  children: React.ReactNode;
}) {
  const scrolled = useScrollTop();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div
          className={cn(
            "navbar z-40 fixed top-0  bg-background   ",
            scrolled && " border-b   w-full"
          )}
        >
          <div className="flex-none lg:hidden  ">
            <Button size={"icon"} variant={"ghost"}>
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className=" "
              >
                <MenuIcon className=" w-5 h-6  mr-2 " />
              </label>
            </Button>
            <Logo sidebar={false} />
          </div>
          <div className=" flex-none  fixed right-2 top-1">
            <div className="  flex flex-row space-x-4  sm:spae-0  py-1   ">
              {/* Navbar menu content here */}
              <Button variant={"ghost"} className="sm:mx-1 px-1">
                <Link href={"/"}> exit </Link>
                <ExitIcon className="h-5 w-5 mx-1 " />
              </Button>
              <Button variant={"ghost"} className="sm:mx-1 px-1">
                <ClerkLoading>
                  <LoaderSpiner size={"sm"} />
                </ClerkLoading>
                <UserButton signInUrl="/" />
              </Button>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <main className=" flex flex-col justify-center items-center h-screen">
          {children}
        </main>
        <Footer />
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" flex flex-col  p-4 w-80 min-h-full z-50 bg-slate-200  dark:bg-zinc-900">
          {/* Sidebar content here */}

          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className=" lg:hidden   mb-2 "
          >
            <XIcon className=" w-5 h-6 " />
          </label>
          <div className=" w-full">
            <Logo sidebar={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
