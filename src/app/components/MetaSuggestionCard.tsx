"use client";

import { ProMetaSuggestion } from "@/types/dota";
import { Badge, Card, Image } from "@heroui/react";
// import Image from "next/image";

interface MetaSuggestionCardProps {
  suggestion: ProMetaSuggestion;
}

const MetaSuggestionCard = ({ suggestion }: MetaSuggestionCardProps) => {
  const { hero, reason, pick_rate_percentage, win_rate_percentage } =
    suggestion;

  return (
    <Card className="overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-45 w-full bg-gray-700 flex items-center justify-center">
        {hero.fullImageUrl ? (
          <Image
            src={hero.fullImageUrl || ""}
            alt={hero.localized_name}
            className="w-full h-full object-cover opacity-70"
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
          <Badge color="success" className="mb-2 mr-2">
            <span className="mr-1">▲</span>
            {win_rate_percentage.toFixed(2)}% Win Rate
          </Badge>
          <Badge color="warning" className="mb-2">
            <span className="mr-1">↔</span>
            {pick_rate_percentage.toFixed(2)}% Pick Rate
          </Badge>
        </div>
        {suggestion.ban_rate_percentage && (
          <Badge color="danger" className="mt-2 w-full text-center">
            <span className="mr-1">▼</span>
            {suggestion.ban_rate_percentage.toFixed(2)}% Ban Rate
          </Badge>
        )}
      </div>
    </Card>
  );
};
export default MetaSuggestionCard;
