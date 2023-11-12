import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { url } = await req.json();

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

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: Number(params.courseId),
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[post  Courses id   attachments ]", error);
    return new NextResponse("Internal  Error ", { status: 500 });
  }
};
