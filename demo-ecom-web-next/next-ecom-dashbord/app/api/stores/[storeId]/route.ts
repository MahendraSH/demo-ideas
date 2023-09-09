import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
      return new NextResponse("unautherized exiss", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId ||  params.storeId.length< 24) {
      return new NextResponse("Store id is required ", { status: 400 });
    }
    const store = await prismadb.store.updateMany({
      where: {
        userId,
        id: params.storeId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log(`[store_patch]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unautherized exiss", { status: 401 });
    }
    if (!params.storeId || params.storeId.length < 24) {
      return new NextResponse("Store id is required ", { status: 400 });
    }
    const store = await prismadb.store.deleteMany({
      where: {
        userId,
        id: params.storeId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log(`[store_delete ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
