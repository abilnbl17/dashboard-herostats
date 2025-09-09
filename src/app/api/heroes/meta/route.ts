import { getProMetaSuggestions } from "@/lib/services/heroService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const metaHeros = await getProMetaSuggestions();
    return NextResponse.json(metaHeros);
  } catch (error) {
    console.error("Error fetching pro meta suggestions:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data saran meta" },
      { status: 500 }
    );
  }
}
