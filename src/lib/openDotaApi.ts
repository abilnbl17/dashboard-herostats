import { HeroStats, PlayerMatch } from "@/types/dota";
import openDotaApiClient from "./utils/axiosInstance";

export const fetchHeroStats = async (): Promise<HeroStats[]> => {
  try {
    const response = await openDotaApiClient.get<HeroStats[]>("/herostats");
    return response.data;
  } catch (error) {
    console.error("Error fetching hero stats fromo OpenDota API:", error);
    throw new Error("Gagal mengambil statistik hero dari OpenDota");
  }
};

export const fetchPlayerMathes = async (
  accoundId: string
): Promise<PlayerMatch[]> => {
  try {
    const response = await openDotaApiClient.get<PlayerMatch[]>(
      `/players/${accoundId}/matches`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching player matches for accound ID ${accoundId}:`,
      error
    );
    throw new Error(`Gagal mengambil data pertandigan pemain ${accoundId}.`);
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
