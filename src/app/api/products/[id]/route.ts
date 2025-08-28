// src/app/api/products/[id]/route.ts
import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Params {
  params: { id: string };
}

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const db = await getDatabase();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
