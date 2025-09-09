import {
  HeroStats,
  PlayerHeroSuggestion,
  ProMetaSuggestion,
} from "@/types/dota";
import { fetchHeroStats, fetchPlayerMatches } from "../openDotaApi";

// Helper Function
const calculateWinRate = (pick: number, win: number): number => {
  if (pick === 0) return 0;
  return (win / pick) * 100;
};

const calculatePickRate = (pick: number, totalPicks: number): number => {
  if (totalPicks === 0) return 0;
  return (pick / totalPicks) * 100;
};

export const getTieredHeroSuggestions = async (): Promise<
  Record<string, HeroStats[]>
> => {
  const herostats = await fetchHeroStats();

  const totalProPicks = herostats.reduce((sum, hero) => sum + hero.pro_pick, 0);

  const heroesWithScores = herostats.map((hero) => {
    const proWinRate = calculateWinRate(hero.pro_pick, hero.pro_win);
    const proPickRate = calculatePickRate(hero.pro_pick, totalProPicks);
    const score = proWinRate * 0.7 + proPickRate * 0.3;
    return {
      ...hero,
      pro_win_rate_percentage: proWinRate,
      pro_pick_rate_percentage: proPickRate,
      score: score,
    };
  });

  heroesWithScores.sort((a, b) => b.score - a.score);

  const tieredHeroes: Record<string, HeroStats[]> = {};
  const numTiers = 0;
  const heroesPerTier = Math.ceil(heroesWithScores.length / numTiers);

  for (let i = 0; i < numTiers; i++) {
    const tierName = `Tier ${numTiers - i}`;
    const startIndex = i * heroesPerTier;
    const endIndex = startIndex + heroesPerTier;
    const tierHeroes = heroesWithScores.slice(startIndex, endIndex);

    tieredHeroes[tierName] = tierHeroes.slice(0, 10);
  }
  return tieredHeroes;
};

// Feature 2: Meta Suggestion Based on Pro Pick + Ban and Winrate

export const getProMetaSuggestions = async (): Promise<ProMetaSuggestion[]> => {
  const heroStats = await fetchHeroStats();

  const totalProPicks = heroStats.reduce((sum, hero) => sum + hero.pro_pick, 0);
  const totalProBans = heroStats.reduce(
    (sum, hero) => sum + (hero.pro_ban || 0),
    0
  );

  const proMetaHeroes = heroStats
    .map((hero) => {
      const proWinRate = calculateWinRate(hero.pro_pick, hero.pro_win);
      const proPickRate = calculatePickRate(hero.pro_pick, totalProPicks);
      const proBanRate = calculatePickRate(hero.pro_ban || 0, totalProBans);
      // Kriteria Saran meta pro bisa diatur disini

      if (proWinRate > 55 && (proPickRate > 2 || proBanRate > 2)) {
        return {
          hero: hero,
          pick_rate_percentage: proPickRate,
          win_rate_percentage: proWinRate,
          ban_rate_percentage: proBanRate,
          reason: `Hero dengan win rate pro ${proWinRate.toFixed(
            2
          )}% dan pick / ban rate signifikan`,
        };
      }
      return null;
    })
    .filter(Boolean) as ProMetaSuggestion[];

  // Urutkan berdasarkan kombinasi win rate dan pick rate untuk menampilkan yang paling relevan
  proMetaHeroes.sort((a, b) => {
    const scoreA = a.win_rate_percentage * 0.6 + a.pick_rate_percentage * 0.4;
    const scoreB = b.win_rate_percentage * 0.6 + b.pick_rate_percentage * 0.4;
    return scoreB - scoreA;
  });

  return proMetaHeroes.slice(0.2);
};

// Fitur 3: Automated Hero Suggestion GIven a Player Account ID

export const getSuggestedHeroesForPlayer = async (
  accountId: string
): Promise<PlayerHeroSuggestion[]> => {
  const playerMatches = await fetchPlayerMatches(accountId);
  const allHeroStats = await fetchHeroStats();

  if (playerMatches.length === 0) {
    const topMetaHeroes = (await getProMetaSuggestions()).map((s) => s.hero);
    return topMetaHeroes.slice(0, 5).map((hero) => ({
      hero: hero,
      reason:
        "Pemain belum memiliki riwayat pertandingan. Disaranakn hero meta populer",
    }));
  }

  // Logika Analisis Pemain
  const heroPerformance: Record<number, { games: number; wins: number }> = {};
  const playedHeroIds = new Set<number>();

  for (const match of playerMatches) {
    playedHeroIds.add(match.hero_id);
    if (!heroPerformance[match.hero_id]) {
      heroPerformance[match.hero_id] = { games: 0, wins: 0 };
    }
    heroPerformance[match.hero_id].games++;
    // cek apakah pemain menang di pertandingan ini. Logika ini tergantung player_slot dan radiant_win
    const isRadiant = match.player_slot >= 0 && match.player_slot <= 4;
    const didWin =
      (isRadiant && match.radiant_win) || (!isRadiant && !match.radiant_win);
    if (didWin) {
      heroPerformance[match.hero_id].wins++;
    }
  }

  const suggestion: PlayerHeroSuggestion[] = [];
  // 1 Sarankan hero yang sering dimainkan dengan winrate bagus oleh pemain
};
