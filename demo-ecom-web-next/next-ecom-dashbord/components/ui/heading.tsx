import { FC } from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold  tracking-tight ">{title}</h2>
      <p className="text-sm  text-muted-foreground ">{description}</p>
    </div>
  );
};

export default Heading;
