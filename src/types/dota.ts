export interface HeroStats {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: "str" | "agi" | "int";
  attack_type: "Melee" | "Ranged";
  roles: string[];
  icon: string;
  base_health: number;
  base_mana: number;
  base_armor: number;
  base_attack_min: number;
  base_attack_max: number;
  move_speed: number;

  pro_pick: number;
  pro_ban: number;
  pro_win: number;
  "1_pick": number;
  "1_win": number;
  "2_pick": number;
  "2_win": number;
  "3_pick": number;
  "3_win": number;
  "4_pick": number;
  "4_win": number;
  "5_pick": number;
  "5_win": number;
  "6_pick": number;
  "6_win": number;
  "7_pick": number;
  "7_win": number;
  "8_pick": number;
  "8_win": number;

  calculated_tier?: string;
  pro_win_rate_percentage?: number;
  pro_pick_rate_percentage?: number;
}

export interface PlayerMatch {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  version: number;
  kills: number;
  deaths: number;
  assists: number;
  skill: number;
  leaver_status: number;
  cluster: number;
  xp_per_min: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  lane: number;
  lane_role: number;
  is_roaming: boolean;
}

export interface ProMetaSuggestion {
  hero: HeroStats;
  reason: string;
  pick_rate_percentage: number;
  win_rate_percentage: number;
  ban_rate_percentage: number;
}

export interface PlayerHeroSuggestion {
  hero: HeroStats;
  reason: string;
  player_win_rate?: number;
  player_games_played?: number;
}

export interface DashboardHeroSummary {
  id: number;
  localized_name: string;
  img: string;
  primary_attr: "str" | "agi" | "int";
  roles: string[];
  calculated_tier?: string;
  overall_win_rate?: number;
}
