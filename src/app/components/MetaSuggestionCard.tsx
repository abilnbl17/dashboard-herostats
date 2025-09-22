"use client";

import { ProMetaSuggestion } from "@/types/dota";
import { Card, Code } from "@heroui/react";
import Image from "next/image";

interface MetaSuggestionCardProps {
  suggestion: ProMetaSuggestion;
}

const MetaSuggestionCard = ({ suggestion }: MetaSuggestionCardProps) => {
  const { hero, reason, pick_rate_percentage, win_rate_percentage } =
    suggestion;

  return (
    <Card className="overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-50 w-full bg-gray-700 flex items-center justify-center">
        {hero.fullImageUrl ? (
          <Image
            src={hero.fullImageUrl || ""}
            alt={hero.localized_name}
            fill
            priority
            className=" opacity-70"
          />
        ) : (
          <span className="text-white text-sm">Gambar Tidak Tersedia</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 flex items-end p-4">
          {/* dibawah ini ada keterangan menggunakan tag html <CardTitle> tetapi pada HeroUI tidak ada component tersebut */}
          <h3 className="text-white text-xl font-bold">
            {hero.localized_name}
          </h3>
          {/* Batasnya sampai disni dan saya berikan sebuah tag div biasa  */}
        </div>
      </div>

      <div className="p-4 text-white bg-gray-800">
        <p className="txt-sm italic mb-3 text-gray-300">{reason}</p>

        <div className="flex flex-wrap justify-between items-center text-sm font-semibold">
          <Code size="sm" className="text-green-600">
            <span className="mr-1">▲</span>
            {win_rate_percentage.toFixed(2)}% Win Rate
          </Code>
          <Code size="sm" className="text-amber-500">
            <span className="mr-1">↔</span>
            {pick_rate_percentage.toFixed(2)}% Pick Rate
          </Code>
        </div>
        {suggestion.ban_rate_percentage && (
          <Code size="lg" className="flex justify-center text-red-800">
            <span className="mr-1">▼</span>
            {suggestion.ban_rate_percentage.toFixed(2)}% Ban Rate
          </Code>
        )}
      </div>
    </Card>
  );
};
export default MetaSuggestionCard;
