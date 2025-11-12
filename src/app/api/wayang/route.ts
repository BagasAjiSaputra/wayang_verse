// app/api/wayang/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db/index";
import { wayang } from "../../../../lib/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(wayang);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching all wayang:", error);
    return NextResponse.json(
      { error: "Gagal mengambil daftar tokoh wayang" },
      { status: 500 }
    );
  }
}