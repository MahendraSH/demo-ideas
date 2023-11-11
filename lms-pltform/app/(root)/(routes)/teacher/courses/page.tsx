import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface CoursePageProps {}

const CoursePage: FC<CoursePageProps> = ({}) => {
  return (
    <div className=" p-6 min-h-screen">
      <Link href={"/teacher/create"}>
        <Button>New Course</Button>
      </Link>
    </div>
  );
};

export default CoursePage;
