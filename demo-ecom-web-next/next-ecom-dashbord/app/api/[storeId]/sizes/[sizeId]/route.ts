import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId || params.sizeId.length < 24) {
      return new NextResponse("params sizeId  is required", {
        status: 400,
      });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log(`[size_get ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    if (!userId) {
      return new NextResponse("unauthenticated exiss", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }
    if (!params.storeId || params.storeId.length < 24) {
      return new NextResponse("params storeId  is required", { status: 400 });
    }
    if (!params.sizeId || params.sizeId.length < 24) {
      return new NextResponse("params sizeId  is required", {
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

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log(`[size_patch]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
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
    if (!params.sizeId || params.sizeId.length < 24) {
      return new NextResponse("params sizeId  is required", {
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

    const size = await prismadb.size.deleteMany({
      where: {
        storeId: params.storeId,
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log(`[size_delete ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
