import { FC } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

interface footerProps {}

const Footer: FC<footerProps> = ({}) => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50  dark:bg-[#1F1F1F]">
      <Logo sidebar={false} />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant={"ghost"}>Privacy Policy</Button>
        <Button variant={"ghost"}>Terms & Condions</Button>
      </div>
    </div>
  );
};

export default Footer;
