import { HeroStats, PlayerMatch } from "@/types/dota";
import openDotaApiClient from "../utils/axiosInstance";

export const fetchHeroStats = async (): Promise<HeroStats[]> => {
  try {
    const response = await openDotaApiClient.get<HeroStats[]>("/herostats");
    return response.data;
  } catch (error) {
    console.error("Error fetching hero stats fromo OpenDota API:", error);
    throw new Error("Gagal mengambil statistik hero dari OpenDota");
  }
};

export const fetchPlayerMatches = async (
  accountId: string
): Promise<PlayerMatch[]> => {
  try {
    const response = await openDotaApiClient.get<PlayerMatch[]>(
      `/players/${accountId}/matches`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching player matches for account ID ${accountId}:`,
      error
    );
    throw new Error(`Gagal mengambil data pertandigan pemain ${accountId}.`);
  }
};

// export const fetchHeroById = async (heroId: number): Promise<HeroStats> => {
//   try {
//     const response = await openDotaApiClient.get<HeroStats>(
//       `/heroes/${heroId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching hero with ID ${heroId}:`, error);
//     throw new Error(`Failed to fetch hero with ID ${heroId}.`);
//   }
// };
