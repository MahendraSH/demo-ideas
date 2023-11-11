import { Button } from "@/components/ui/button";
import { FC } from "react";

interface BrouserPageProps {}

const BrouserPage: FC<BrouserPageProps> = ({}) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Button>BrouserPage</Button>
    </div>
  );
};

export default BrouserPage;
