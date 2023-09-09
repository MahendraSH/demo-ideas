import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId || params.colorId.length < 24) {
      return new NextResponse("params colorId  is required", {
        status: 400,
      });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(`[color_get ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
    if (!params.colorId || params.colorId.length < 24) {
      return new NextResponse("params colorId  is required", {
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

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(`[color_patch]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
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
    if (!params.colorId || params.colorId.length < 24) {
      return new NextResponse("params colorId  is required", {
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

    const color = await prismadb.color.deleteMany({
      where: {
        storeId: params.storeId,
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log(`[color_delete ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
