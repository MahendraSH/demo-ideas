import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();
    if (!userId) {
      return new NextResponse("unauthenticated exiss", { status: 401 });
    }
    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }
    if (!params.storeId || params.storeId.length < 24) {
      return new NextResponse("params storeId  is required", { status: 400 });
    }

    const storeById = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });
    if (!storeById) {
      return new NextResponse("unautherized exiss", { status: 401 });
    }
    const billbord = await prismadb.billbord.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(`[billbord_post]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId || params.storeId.length < 24) {
      return new NextResponse("params storeId  is required", { status: 400 });
    }

    const billbords = await prismadb.billbord.findMany({
      where:{
        storeId:params.storeId,
      }
    });
    return NextResponse.json(billbords);
  } catch (error) {
    console.log(`[billbord_get]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
