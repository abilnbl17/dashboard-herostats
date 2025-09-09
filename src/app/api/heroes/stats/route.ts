import { getTieredHeroSuggestions } from "@/lib/services/heroService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tieredHeroes = await getTieredHeroSuggestions();
    return NextResponse.json(tieredHeroes);
  } catch (error) {
    console.error("Error fetching tiered hero suggestion:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data hero" },
      { status: 500 }
    );
  }
}
