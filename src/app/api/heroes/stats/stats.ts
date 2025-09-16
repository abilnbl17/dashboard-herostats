import { getTieredHeroSuggestions } from "@/lib/services/heroService";
import axios from "axios";
import { NextResponse } from "next/server";

const fetchHeroStats = async () => {
  try {
    // const response = await axios.get("/api/heroes/stats");
    // try another code
    const response = await axios.get(
      `${process.env.OPENDOTA_BASE_URL}/api/heroes/stats`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch hero stats:", error);
    return null;
  }
};
export default fetchHeroStats;

export async function GET() {
  try {
    const data = await getTieredHeroSuggestions();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
