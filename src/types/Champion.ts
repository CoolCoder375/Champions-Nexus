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

// Class configuration with SVG paths
export const ChampionClassConfig = {
  [ChampionClass.COSMIC]: {
    name: 'Cosmic',
    svgPath: '/images/class_svgs/Cosmic.svg',
    cssClass: 'cosmic'
  },
  [ChampionClass.TECH]: {
    name: 'Tech',
    svgPath: '/images/class_svgs/Tech.svg',
    cssClass: 'tech'
  },
  [ChampionClass.MUTANT]: {
    name: 'Mutant',
    svgPath: '/images/class_svgs/Mutant.svg',
    cssClass: 'mutant'
  },
  [ChampionClass.SKILL]: {
    name: 'Skill',
    svgPath: '/images/class_svgs/Skill.svg',
    cssClass: 'skill'
  },
  [ChampionClass.SCIENCE]: {
    name: 'Science',
    svgPath: '/images/class_svgs/Science.svg',
    cssClass: 'science'
  },
  [ChampionClass.MYSTIC]: {
    name: 'Mystic',
    svgPath: '/images/class_svgs/Mystic.svg',
    cssClass: 'mystic'
  }
} as const;

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