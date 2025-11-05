import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode } = (await req.json()) as {
      prompt: string;
      mode: "story" | "summarize" | "translate";
    };

    let text = "";

    if (mode === "story") {
      text = `Cerita dummy: "${prompt}". Ini versi alur cerita dummy yang panjang dan epik.`;
    } else if (mode === "summarize") {
      text = `Ringkasan dummy: "${prompt}". Ini versi ringkasan sederhana.`;
    } else if (mode === "translate") {
      text = `Terjemahan dummy: "${prompt}". Ini versi terjemahan sederhana.`;
    }

    await new Promise((res) => setTimeout(res, 800));

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ text: "Terjadi kesalahan pada API dummy." }, { status: 500 });
  }
}
