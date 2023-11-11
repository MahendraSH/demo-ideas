import Image from "next/image";
import { FC } from "react";

interface HerosProps {}

const Heros: FC<HerosProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center ">
        <div className=" ">
          <Image
            src={"/destop.png"}
            width={300}
            height={300}
            alt="documents"
            className="  dark:hidden"
          />
          <Image
            src={"/destop-dark.png"}
            width={300}
            height={300}
            alt="documents"
            className=" hidden dark:block"
          />
        </div>
        <div className="md:block">
          <Image
            src="/reading.png"
            width={400}
            height={400}
            className=" dark:hidden"
            alt="reading"
          />
          <Image
            src="/reading-dark.png"
            width={400}
            height={400}
            className=" hidden dark:block"
            alt="reading"
          />
        </div>
      </div>
    </div>
  );
};

export default Heros;
