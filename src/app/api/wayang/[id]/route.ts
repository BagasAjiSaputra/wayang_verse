import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ ambil params dengan await

  try {
    // contoh fetch data dari database atau array
    const wayang = {
      id,
      nama: "Semar",
      images: "/images/semar.jpg",
      kisah: "Semar adalah punakawan bijak dalam pewayangan.",
    };

    if (!wayang) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(wayang, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
