import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId || params.categoryId.length < 24) {
      return new NextResponse("params categoryId  is required", {
        status: 400,
      });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(`[category_get ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const { name ,billbordId} = await req.json();
    if (!userId) {
      return new NextResponse("unauthenticated exiss", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billbordId) {
      return new NextResponse("billbord id  is required", { status: 400 });
    }
    if (!params.storeId || params.storeId.length < 24) {
      return new NextResponse("params storeId  is required", { status: 400 });
    }
    if (!params.categoryId || params.categoryId.length < 24) {
      return new NextResponse("params categoryId  is required", {
        status: 400,
      });
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

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billbordId
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(`[category_patch]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unautherized exiss", { status: 401 });
    }
    if (!params.storeId || params.storeId.length < 24) {
      return new NextResponse("params storeId  is required", {
        status: 400,
      });
    }
    if (!params.categoryId || params.categoryId.length < 24) {
      return new NextResponse("params categoryId  is required", {
        status: 400,
      });
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

    const category = await prismadb.category.deleteMany({
      where: {
        storeId: params.storeId,
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(`[category_delete ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
