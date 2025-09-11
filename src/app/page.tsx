import { useEffect, useState } from "react";
import axios from "axios";
import {
  HeroStats,
  PlayerHeroSuggestion,
  ProMetaSuggestion,
} from "@/types/dota";

interface TieredHeroData {
  [tierName: string]: HeroStats[];
}
export default function Home() {
  // State untuk data hero dari API route /api/heroes/stats
  const [heroData, setHeroData] = useState<TieredHeroData | null>(null);
  const [metaSuggestions, setMetaSuggestions] = useState<
    ProMetaSuggestion[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk fitur pencarian pemain
  const [playerSuggestions, setPlayerSuggestions] = useState<
    PlayerHeroSuggestion[] | null
  >(null);
  const [isPlayerSearchLoading, setIsPlayerSearchLoading] =
    useState<boolean>(false);
  const [playerSearchError, setPlayerSearchError] = useState<string | null>(
    null
  );

  // Mengambil semua data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data hero dan meta secara paralel untuk efisiensi
        const [heroesRes, metaRes] = await Promise.all([
          axios.get("api/heroes/stats"),
          axios.get("/api/heroes/meta"),
        ]);

        setHeroData(heroesRes.data);
        setMetaSuggestions(metaRes.data);
      } catch (err: any) {
        console.error("Failed to fetch initial data:", err);
        setError(err.message || "Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handler untuk pencarian pemain
  const handlePlayerSearch = async (accountId: string) => {
    setIsPlayerSearchLoading(true);
    setPlayerSearchError(null);
    setPlayerSuggestions(null); // Reset saran sebelumnya
    try {
      const response = await axios.get(
        `/api/players/${accountId}/suggested-heroes`
      );
      setPlayerSuggestions(response.data);
    } catch (err: any) {
      console.error("Failed to fetch player suggestions:", err);
      setPlayerSearchError(
        err.response?.data?.message ||
          "Gagal mengambil saran hero untuk pemain."
      );
    } finally {
      setIsPlayerSearchLoading(false);
    }
  };
  return (
    <div>
      Test
      {/* <HeroStatsTable data={heroData[tierName]} /> */}
    </div>
  );
}
