import { Button } from "@/components/ui/button";
import LoaderSpiner from "@/components/ui/loader-spiner";
import { siteConfig } from "@/lib/config/site-config";
import { ClerkLoading, ClerkLoaded, SignInButton, auth } from "@clerk/nextjs";
import { ArrowRight, MoveDown } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({}) => {
  const { userId } = auth();
  const isAuth = userId ? true : false;
  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent  bg-gradient-to-l from-zinc-400 to-gray-700 dark:bg-gradient-to-tr dark:from-slate-300  dark:via-primary/40 dark:to-secondary">
          Your Online Learning & Teaching Marketplace . Welcome to{" "}
          <span className="underline">{siteConfig.name}</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium text-muted-foreground dark:text-primary/50">
          {siteConfig.description}
        </h3>

        <ClerkLoading>
          <div className="flex justify-center mx-auto ">
            <LoaderSpiner />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <>
            {!isAuth && (
              <div className="flex justify-center mx-auto  ">
                <span className="btn  ">
                  <SignInButton>Get Started</SignInButton>
                </span>
              </div>
            )}

            {isAuth && (
              <div className="flex justify-center mx-auto ">
                <Link href="/dashbord" className="">
                  <Button variant={"secondary"}>
                    Dashbord
                    <ArrowRight className=" h-5 w-5 ml-2 " />
                  </Button>
                </Link>
              </div>
            )}
          </>
        </ClerkLoaded>
      </div>
    </>
  );
};

export default Heading;
