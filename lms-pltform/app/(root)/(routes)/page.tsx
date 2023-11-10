import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { FC } from "react";

interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <div>
      <Button> LandingPage</Button>
      {/* <UserButton afterSignOutUrl="/" /> */}
    </div>
  );
};

export default LandingPage;
