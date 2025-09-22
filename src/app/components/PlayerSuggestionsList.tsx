"use client";

import { PlayerHeroSuggestion } from "@/types/dota";
import { Card, Code } from "@heroui/react";
import Image from "next/image";
import React from "react";

interface PlayerSuggestionsListProps {
  suggestions: PlayerHeroSuggestion[];
}

const PlayerSuggestionsList: React.FC<PlayerSuggestionsListProps> = ({
  suggestions,
}: PlayerSuggestionsListProps) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Tidak ada saran hero yang ditemukan untuk pemain ini
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24">
      {suggestions.map((suggestion, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-transform transform hover:scale-105"
        >
          <div className="relative h-40">
            {suggestion.hero.fullImageUrl ? (
              <Image
                src={suggestion.hero.fullImageUrl || ""}
                alt={suggestion.hero.localized_name}
                fill
                priority
                className="opacity-70"
              />
            ) : (
              <div className="bg-gray-700 h-full flex items-center justify-center">
                <span className="text-white">Gambar Tidak tersedia</span>
              </div>
            )}
            {/* ini adalah nama yang didepan dari gambarnya */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 flex items-end p-4">
              <h3 className="text-white text-xl font-bold">
                {suggestion.hero.localized_name}
              </h3>
            </div>
            {/* ini ada close code  */}
          </div>
          <div className="p-4 text-white bg-gray-800">
            <p className="text-sm italic mb-3 text-gray-300">
              "{suggestion.reason}"
            </p>
            {suggestion.player_win_rate !== null &&
              suggestion.player_win_rate !== undefined && (
                <div className="flex flex-warp justify-between items-center text-sm font-semibold">
                  <Code size="sm" className="text-green-600">
                    <span className="mr-1">▲</span>
                    {suggestion.player_win_rate.toFixed(2)}% Win Rate
                  </Code>
                  <Code size="sm" className="text-amber-500">
                    <span className="mr-1">▶</span>
                    {suggestion.player_games_played} Games
                  </Code>
                </div>
              )}
          </div>
        </Card>
      ))}
    </div>
  );
};
export default PlayerSuggestionsList;
