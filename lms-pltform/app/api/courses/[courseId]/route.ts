import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("  Unautherized ", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: Number(params.courseId),
        userId: userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[updated  Courses id]", error);
    return new NextResponse("Internal  Error ", { status: 500 });
  }
};
