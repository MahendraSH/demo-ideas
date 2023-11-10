import { siteConfig } from "@/lib/config/site-config";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./button";

interface LogoProps {
  sidebar: boolean;
}

const Logo: FC<LogoProps> = ({ sidebar }) => {
  const imageStr = sidebar ? "learnIn" : "logo";
  return (
    <Link href={"/"}>
      <Button
        variant={sidebar ? "default" : "ghost"}
        className="   normal-case text-xl  shadow-none w-full justify-start px-0 mx-0"
      >
        <Image
          src={`/${imageStr}-dark.png`}
          width={30}
          height={30}
          alt="logo"
          className=" ml-1 hidden dark:block  image-full"
        />
        <Image
          src={`/${imageStr}.png`}
          width={30}
          height={30}
          alt="logo"
          className="ml-1 dark:hidden image-full  "
        />
        {siteConfig.name}
      </Button>
    </Link>
  );
};

export default Logo;
