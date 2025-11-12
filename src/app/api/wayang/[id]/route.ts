// app/api/wayang/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/index";
import { wayang } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await db
      .select()
      .from(wayang)
      .where(eq(wayang.id, id))
      .limit(1);

    if (data.length === 0) {
      return NextResponse.json({ error: "Tokoh wayang tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching wayang by ID:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}