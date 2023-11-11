import { FC } from "react";
import LoaderSpiner from "./ui/loader-spiner";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

interface NavbarRoutesProps {}

const NavbarRoutes: FC<NavbarRoutesProps> = ({}) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.startsWith("/chapter");
  return (
    <>
      <ClerkLoading>
        <LoaderSpiner  />
      </ClerkLoading>
      <ClerkLoaded>
        {isTeacherPage || isPlayerPage ? (
          <Link href={"/"}>
            <Button variant={"ghost"} size={"sm"} className="sm:mx-1 px-1">
              <LogOutIcon className="h-5 w-5 mx-1 " />
              exit
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button variant={"ghost"} size={"sm"}>
              Teacher mode
            </Button>
          </Link>
        )}
        <Button variant={"ghost"} className="sm:mx-1 px-1">
          <UserButton afterSignOutUrl="/" />
        </Button>
      </ClerkLoaded>
    </>
  );
};

export default NavbarRoutes;
