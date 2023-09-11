import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name, billbordId } = await req.json();
    if (!userId) {
      return new NextResponse("unauthenticated exiss", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
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
    const category = await prismadb.category.create({
      data: {
        storeId: params.storeId,
        billbordId,
        name,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(`[category_post]  ${error}`);
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

    const categorys = await prismadb.category.findMany({
      where:{
        storeId:params.storeId,
      }
    });
    return NextResponse.json(categorys);
  } catch (error) {
    console.log(`[category_get]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
