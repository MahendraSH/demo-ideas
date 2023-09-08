"use client";

import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  discription: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const varinMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: FC<ApiAlertProps> = ({
  title,
  discription,
  variant = "public",
}) => {
  const onCopy = (discription: string) => {
    navigator.clipboard.writeText(discription);
    toast.success("API Route copied  to clipbord . ");
  };

  return (
    <Alert>
      <Server className="h-4 w-4 " />
      <AlertTitle className="flex items-center gap-x-2 ">
        {title}
        <Badge variant={varinMap[variant]}> {textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between ">
        <code className="font-mono text-sm font-semibold  relative rounded bg-muted  px-[0.3rem] py-[0.2rem]">
          {discription}
        </code>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => onCopy(discription)}
        >
          <Copy className="h-4 w-4 " />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
