import { FC } from "react";

import Heros from "./_components/heros";
import Footer from "./_components/footer";
import Heading from "./_components/heading";
interface LandingPageProps {}

const LandingPage: FC<LandingPageProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pt-16 mt-1">
      <Heading />
      <Heros />
    </div>
  );
};

export default LandingPage;
