"use client";

import Footer from "@/components/footer";
import SidebarRoutes from "@/components/sidebar-routes";
import { XIcon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Navbar from "@/components/navbar";

export default function RootRoutesLayout({
  // ((root))
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page content here */}
        <main className=" pt-16">
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
        <div className=" flex flex-col  w-80 min-h-full  bg-slate-200  dark:bg-zinc-900 my-2 z-50">
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

          <SidebarRoutes />
        </div>
      </div>
    </div>
  );
}
