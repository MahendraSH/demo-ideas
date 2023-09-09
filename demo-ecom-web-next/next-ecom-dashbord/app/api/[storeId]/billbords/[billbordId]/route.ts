import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { billbordId: string } }
) {
  try {
    if (!params.billbordId || params.billbordId.length < 24) {
      return new NextResponse("params billbordId  is required", {
        status: 400,
      });
    }

    const billbord = await prismadb.billbord.findUnique({
      where: {
        id: params.billbordId,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(`[billbord_get ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billbordId: string } }
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
    if (!params.billbordId || params.billbordId.length < 24) {
      return new NextResponse("params billbordId  is required", {
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

    const billbord = await prismadb.billbord.update({
      where: {
        id: params.billbordId,
        storeId: params.storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(`[billbord_patch]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billbordId: string } }
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
    if (!params.billbordId || params.billbordId.length < 24) {
      return new NextResponse("params billbordId  is required", {
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

    const billbord = await prismadb.billbord.deleteMany({
      where: {
        storeId: params.storeId,
        id: params.billbordId,
      },
    });
    return NextResponse.json(billbord);
  } catch (error) {
    console.log(`[billbord_delete ]  ${error}`);
    return new NextResponse("internal server error", { status: 500 });
  }
}
