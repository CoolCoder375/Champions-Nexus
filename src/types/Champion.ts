export interface ChampionStats {
  health: number;
  attack: number;
  defense: number;
  criticalRating: number;
  criticalDamageRating: number;
  armor: number;
  blockProficiency: number;
  energyResistance: number;
  physicalResistance: number;
}

export interface Champion {
  id: string;
  name: string;
  class: ChampionClass;
  stars: number;
  image: string;
  featured_image: string;
  description: string;
  availableTiers: number[];
  stats: Record<number, ChampionStats>;
  hasAwakening: boolean;
  maxSignatureLevel: number;
}

export const ChampionClass = {
  COSMIC: 'Cosmic',
  TECH: 'Tech',
  MUTANT: 'Mutant',
  SKILL: 'Skill',
  SCIENCE: 'Science',
  MYSTIC: 'Mystic'
} as const;

export type ChampionClass = typeof ChampionClass[keyof typeof ChampionClass];

export interface StrategyQuestion {
  id: string;
  question: string;
  category: 'gameplay' | 'counters' | 'abilities' | 'general';
}

export interface ChampionAnalysis {
  champion: Champion;
  question: StrategyQuestion;
  answer: string;
  timestamp: Date;
}