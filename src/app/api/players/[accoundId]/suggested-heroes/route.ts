import { getSuggestedHeroesForPlayer } from "@/lib/services/heroService";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { accountId: string } }
) {
  const { accountId } = context.params;

  if (!accountId) {
    return NextResponse.json(
      { message: "Parameter accountId diperlukan." },
      { status: 400 }
    );
  }

  try {
    const suggestedHeroes = await getSuggestedHeroesForPlayer(accountId);
    return NextResponse.json(suggestedHeroes);
  } catch (error) {
    console.error(
      `Error fetching suggested heroes for account ID ${accountId}:`,
      error
    );
    return NextResponse.json(
      { message: "Gagal mengambil saran hero untuk pemain" },
      { status: 500 }
    );
  }
}
