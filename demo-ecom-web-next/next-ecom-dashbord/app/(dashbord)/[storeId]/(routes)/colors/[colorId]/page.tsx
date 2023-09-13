import prismadb from "@/lib/prismadb";
import { FC } from "react";
import ColorForm from "./components/color-form";
import { redirect } from "next/navigation";

interface newColorsPageProps {
  params: { colorId: string };
}

const newColorsPage: FC<newColorsPageProps> = async ({ params }) => {
  if (params.colorId === "new") {
    return (
      <div className=" flex-col ">
        <div className="flex-1 space-y-4 p-8 pt-6 ">
          <ColorForm intialData={null} />
        </div>
      </div>
    );
  }
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  if (!color) {
    redirect("/");
  }
  return (
    <div className=" flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ColorForm intialData={color} />
      </div>
    </div>
  );
};

export default newColorsPage;
