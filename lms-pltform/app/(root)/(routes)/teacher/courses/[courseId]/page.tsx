import { IconBadge } from "@/components/icon-batch";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, File, IndianRupeeIcon, LayoutDashboardIcon, ListChecksIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { FC } from "react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/des-form";
import PriceForm from "./_components/price-form";
import ImageForm from "./_components/image-form";
import CategoryIdForm from "./_components/categoryId-form";
import { ListBulletIcon } from "@radix-ui/react-icons";
// import CategoryIdForm from "./_components/categoryId-form";

interface CourseIdPageProps {
  params: { courseId: string };
}

const CourseIdPage: FC<CourseIdPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: Number(params.courseId),
    },
  });

  if (!course) {
    return redirect("/");
  }

  const categorys = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const CompletionText = `(${completedFields}/ ${totalFields})`;
  return (
    <div className="p-6  min-h-screen ">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-y-2 ">
          <h1 className="text-2xl  font-medium">Course Setup</h1>
          <span className=" text-sm  text-primary/50 font-medium ">
            Complete all fields {CompletionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <div className="flex items-center gap-x-2  ">
          {/* <IconBadge icon={LayoutDashboardIcon } iconSize={"md"} /> */}
          <IconBadge icon={LayoutDashboardIcon} />
          <h2 className="text-xl "> Customize your Course </h2>
        </div>
        {/*  form  */}
        <TitleForm courseId={course.id} initialData={course} />
        <DescriptionForm courseId={course.id} initialData={course} />
        <ImageForm courseId={course.id} initialData={course} />
        <CategoryIdForm
          courseId={course.id}
          initialData={course}
          options={categorys.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecksIcon} />
            <h2 className="text-xl"> Course chapters</h2>
          </div>
          TODO
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={IndianRupeeIcon} />
            <h2 className="text-xl">Sell your course</h2>
          </div>
          <PriceForm initialData={course} courseId={course.id} />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">Resources & Attachments </h2>
          </div>
          <ImageForm courseId={course.id} initialData={course} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
