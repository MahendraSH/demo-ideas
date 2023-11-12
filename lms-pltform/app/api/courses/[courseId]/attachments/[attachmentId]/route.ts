import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("  Unautherized ", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: Number(params.courseId),
        userId: userId,
      },
    });
    if (!course) {
      return new NextResponse("  Unautherized ", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: Number(params.courseId),
        id: Number(params.attachmentId),
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[delete   Courses id   attachmentid  ]", error);
    return new NextResponse("Internal  Error ", { status: 500 });
  }
};
