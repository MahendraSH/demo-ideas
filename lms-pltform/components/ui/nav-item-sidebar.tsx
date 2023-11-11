import Link from "next/link";
import { FC } from "react";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemSidbarProps {
  icon: LucideIcon;
  label: string;
  herf: string;
}

const NavItemSidbar: FC<NavItemSidbarProps> = ({ icon: Icon, label, herf }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && herf === "/") ||
    pathname === herf ||
    pathname?.startsWith(`${herf}/`);
    
  return (
    <Link href={herf}>
      <Button
        variant={"ghost"}
        className={cn(
          "   rounded-none  w-full justify-start px-0 mx-0",
          isActive && "text-primary  hover:text-primary/80"
        )}
      >
        <Icon className="h-5 w-5 mx-1  mr-2" />
        {label}
        <div
          className={cn(
            " ml-auto  opacity-0  border-2   border-primary  h-full  transition-all ",
            isActive && "opacity-100"
          )}
        />
      </Button>
    </Link>
  );
};

export default NavItemSidbar;
