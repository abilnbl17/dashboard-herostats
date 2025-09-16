"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HeroStats,
  PlayerHeroSuggestion,
  ProMetaSuggestion,
} from "@/types/dota";
import MetaSuggestionCard from "./components/MetaSuggestionCard";
import PlayerSearchForm from "./components/PlayerSearchForm";
import PlayerSuggestionsList from "./components/PlayerSuggestionsList";

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
      // INI ERROR
      const response = await axios.get(
        `/api/players/${accountId}/suggested-heroes`
      );
      // DIATAS INI ERROR
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
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
        Dota 2 Heroes Dashboard
      </h1>
      {/* Bagian Saran Meta Pro */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Saran Meta Pro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metaSuggestions?.map((suggestion, index) => (
            <MetaSuggestionCard key={index} suggestion={suggestion} />
          ))}
        </div>
      </section>

      {/* Bagian Saran Hero untuk Pemain */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Saran Hero Untuk Pemain
        </h2>
        <PlayerSearchForm
          onSearch={handlePlayerSearch}
          isLoading={isPlayerSearchLoading}
        />
        {isPlayerSearchLoading && (
          <p className="mt-4 text-center text-gray-500">
            Mencari Saran Hero ...
          </p>
        )}

        {playerSearchError && (
          <p className="mt-4 text-center text-red-500">{playerSearchError}</p>
        )}

        {playerSuggestions && (
          <div className="mt-6">
            <PlayerSuggestionsList suggestions={playerSuggestions} />
          </div>
        )}
      </section>
    </main>
  );
}
