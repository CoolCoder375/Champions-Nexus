import { type Champion, ChampionClass } from '../types/Champion';

// Expanded champions list with 25 champions including newer releases
// Distribution: Science(4), Tech(4), Mutant(5), Skill(4), Cosmic(4), Mystic(4)
export const champions: Champion[] = [
  // SCIENCE CHAMPIONS (4)
  {
    id: '1',
    name: 'Spider-Man',
    class: ChampionClass.SCIENCE,
    stars: 4,
    image: '/images/Spider-Man_portrait.jpeg',
    featured_image: '/images/featured/Spider-Man_featured.jpeg',
    description: 'Your friendly neighborhood Spider-Man with evade abilities and web-slinging attacks.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3420, attack: 258, defense: 156, criticalRating: 124, criticalDamageRating: 352, armor: 98, blockProficiency: 1250, energyResistance: 0, physicalResistance: 0 },
      3: { health: 5850, attack: 442, defense: 267, criticalRating: 213, criticalDamageRating: 602, armor: 168, blockProficiency: 2140, energyResistance: 0, physicalResistance: 0 },
      4: { health: 11700, attack: 884, defense: 534, criticalRating: 425, criticalDamageRating: 1205, armor: 336, blockProficiency: 4280, energyResistance: 0, physicalResistance: 0 },
      5: { health: 23100, attack: 1745, defense: 1055, criticalRating: 840, criticalDamageRating: 2380, armor: 663, blockProficiency: 8450, energyResistance: 0, physicalResistance: 0 },
      6: { health: 45600, attack: 3445, defense: 2085, criticalRating: 1660, criticalDamageRating: 4700, armor: 1310, blockProficiency: 16700, energyResistance: 0, physicalResistance: 0 },
      7: { health: 89800, attack: 6785, defense: 4110, criticalRating: 3275, criticalDamageRating: 9275, armor: 2585, blockProficiency: 32950, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '2',
    name: 'Captain America',
    class: ChampionClass.SCIENCE,
    stars: 4,
    image: '/images/Captain_America_portrait.jpeg',
    featured_image: '/images/featured/Captain_America_featured.jpeg',
    description: 'The first Avenger with his iconic vibranium shield and perfect block abilities.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 4200, attack: 267, defense: 205, criticalRating: 128, criticalDamageRating: 364, armor: 136, blockProficiency: 1640, energyResistance: 0, physicalResistance: 0 },
      3: { health: 7200, attack: 458, defense: 351, criticalRating: 220, criticalDamageRating: 624, armor: 234, blockProficiency: 2800, energyResistance: 0, physicalResistance: 0 },
      4: { health: 14400, attack: 916, defense: 702, criticalRating: 441, criticalDamageRating: 1248, armor: 468, blockProficiency: 5600, energyResistance: 0, physicalResistance: 0 },
      5: { health: 28440, attack: 1810, defense: 1387, criticalRating: 871, criticalDamageRating: 2467, armor: 924, blockProficiency: 11060, energyResistance: 0, physicalResistance: 0 },
      6: { health: 56160, attack: 3575, defense: 2739, criticalRating: 1720, criticalDamageRating: 4873, armor: 1826, blockProficiency: 21840, energyResistance: 0, physicalResistance: 0 },
      7: { health: 110760, attack: 7045, defense: 5400, criticalRating: 3392, criticalDamageRating: 9609, armor: 3600, blockProficiency: 43080, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '3',
    name: 'Hulk',
    class: ChampionClass.SCIENCE,
    stars: 4,
    image: '/images/Hulk_portrait.jpeg',
    featured_image: '/images/featured/Hulk_featured.jpeg',
    description: 'The incredible green giant with immense strength that increases with fury.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 4560, attack: 267, defense: 198, criticalRating: 128, criticalDamageRating: 364, armor: 132, blockProficiency: 1675, energyResistance: 0, physicalResistance: 0 },
      3: { health: 7800, attack: 458, defense: 339, criticalRating: 220, criticalDamageRating: 624, armor: 226, blockProficiency: 2870, energyResistance: 0, physicalResistance: 0 },
      4: { health: 15600, attack: 916, defense: 678, criticalRating: 441, criticalDamageRating: 1248, armor: 452, blockProficiency: 5740, energyResistance: 0, physicalResistance: 0 },
      5: { health: 30800, attack: 1810, defense: 1340, criticalRating: 871, criticalDamageRating: 2467, armor: 893, blockProficiency: 11340, energyResistance: 0, physicalResistance: 0 },
      6: { health: 60840, attack: 3575, defense: 2645, criticalRating: 1720, criticalDamageRating: 4873, armor: 1764, blockProficiency: 22400, energyResistance: 0, physicalResistance: 0 },
      7: { health: 120040, attack: 7045, defense: 5215, criticalRating: 3392, criticalDamageRating: 9609, armor: 3477, blockProficiency: 44180, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '4',
    name: 'Spider-Gwen', // NEWER CHAMPION
    class: ChampionClass.SCIENCE,
    stars: 4,
    image: '/images/Spider-Gwen_portrait.jpeg',
    featured_image: '/images/featured/Spider-Gwen_featured.jpeg',
    description: 'Gwen Stacy from an alternate universe with spider powers and web-based abilities.',
    availableTiers: [3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      3: { health: 5950, attack: 445, defense: 270, criticalRating: 218, criticalDamageRating: 615, armor: 175, blockProficiency: 2180, energyResistance: 0, physicalResistance: 0 },
      4: { health: 11900, attack: 890, defense: 540, criticalRating: 435, criticalDamageRating: 1230, armor: 350, blockProficiency: 4360, energyResistance: 0, physicalResistance: 0 },
      5: { health: 23520, attack: 1758, defense: 1066, criticalRating: 859, criticalDamageRating: 2428, armor: 691, blockProficiency: 8612, energyResistance: 0, physicalResistance: 0 },
      6: { health: 46440, attack: 3468, defense: 2105, criticalRating: 1694, criticalDamageRating: 4790, armor: 1363, blockProficiency: 16997, energyResistance: 0, physicalResistance: 0 },
      7: { health: 91540, attack: 6834, defense: 4150, criticalRating: 3340, criticalDamageRating: 9440, armor: 2687, blockProficiency: 33498, energyResistance: 0, physicalResistance: 0 }
    }
  },

  // TECH CHAMPIONS (4)
  {
    id: '5',
    name: 'Iron Man',
    class: ChampionClass.TECH,
    stars: 4,
    image: '/images/Iron_Man_Infinity_War_portrait.jpeg',
    featured_image: '/images/featured/Iron_Man_Infinity_War_featured.jpeg',
    description: 'Genius billionaire playboy philanthropist with advanced armor and arc reactor technology.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3540, attack: 267, defense: 162, criticalRating: 128, criticalDamageRating: 364, armor: 162, blockProficiency: 1295, energyResistance: 0, physicalResistance: 0 },
      3: { health: 6060, attack: 458, defense: 277, criticalRating: 220, criticalDamageRating: 624, armor: 277, blockProficiency: 2220, energyResistance: 0, physicalResistance: 0 },
      4: { health: 12120, attack: 916, defense: 554, criticalRating: 441, criticalDamageRating: 1248, armor: 554, blockProficiency: 4440, energyResistance: 0, physicalResistance: 0 },
      5: { health: 23940, attack: 1810, defense: 1095, criticalRating: 871, criticalDamageRating: 2467, armor: 1095, blockProficiency: 8770, energyResistance: 0, physicalResistance: 0 },
      6: { health: 47280, attack: 3575, defense: 2165, criticalRating: 1720, criticalDamageRating: 4873, armor: 2165, blockProficiency: 17320, energyResistance: 0, physicalResistance: 0 },
      7: { health: 93180, attack: 7045, defense: 4270, criticalRating: 3392, criticalDamageRating: 9609, armor: 4270, blockProficiency: 34160, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '6',
    name: 'War Machine',
    class: ChampionClass.TECH,
    stars: 4,
    image: '/images/War_Machine_portrait.jpeg',
    featured_image: '/images/featured/War_Machine_featured.jpeg',
    description: 'James Rhodes in advanced military armor with heavy weapons and battlefield tactics.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3680, attack: 275, defense: 168, criticalRating: 132, criticalDamageRating: 378, armor: 168, blockProficiency: 1340, energyResistance: 0, physicalResistance: 0 },
      3: { health: 6300, attack: 472, defense: 288, criticalRating: 227, criticalDamageRating: 648, armor: 288, blockProficiency: 2296, energyResistance: 0, physicalResistance: 0 },
      4: { health: 12600, attack: 944, defense: 576, criticalRating: 454, criticalDamageRating: 1296, armor: 576, blockProficiency: 4592, energyResistance: 0, physicalResistance: 0 },
      5: { health: 24885, attack: 1864, defense: 1137, criticalRating: 896, criticalDamageRating: 2559, armor: 1137, blockProficiency: 9063, energyResistance: 0, physicalResistance: 0 },
      6: { health: 49140, attack: 3678, defense: 2244, criticalRating: 1767, criticalDamageRating: 5049, armor: 2244, blockProficiency: 17884, energyResistance: 0, physicalResistance: 0 },
      7: { health: 96840, attack: 7245, defense: 4422, criticalRating: 3482, criticalDamageRating: 9946, armor: 4422, blockProficiency: 35249, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '7',
    name: 'Ghost', // NEWER CHAMPION
    class: ChampionClass.TECH,
    stars: 4,
    image: '/images/Ghost_portrait.jpeg',
    featured_image: '/images/featured/Ghost_featured.jpeg',
    description: 'Phasing technology expert with quantum mechanics mastery and critical hit focus.',
    availableTiers: [4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      4: { health: 10890, attack: 1024, defense: 512, criticalRating: 512, criticalDamageRating: 1434, armor: 256, blockProficiency: 4086, energyResistance: 0, physicalResistance: 0 },
      5: { health: 21510, attack: 2022, defense: 1011, criticalRating: 1011, criticalDamageRating: 2831, armor: 505, blockProficiency: 8070, energyResistance: 0, physicalResistance: 0 },
      6: { health: 42450, attack: 3988, defense: 1994, criticalRating: 1994, criticalDamageRating: 5582, armor: 997, blockProficiency: 15918, energyResistance: 0, physicalResistance: 0 },
      7: { health: 83670, attack: 7856, defense: 3928, criticalRating: 3928, criticalDamageRating: 10999, armor: 1964, blockProficiency: 31367, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '8',
    name: 'Nimrod', // NEWER CHAMPION
    class: ChampionClass.TECH,
    stars: 4,
    image: '/images/Nimrod_portrait.jpeg',
    featured_image: '/images/featured/Nimrod_featured.jpeg',
    description: 'Advanced Sentinel from the future with adaptive technology and mutant-hunting protocols.',
    availableTiers: [5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      5: { health: 24750, attack: 1875, defense: 1125, criticalRating: 900, criticalDamageRating: 2550, armor: 1125, blockProficiency: 9270, energyResistance: 0, physicalResistance: 0 },
      6: { health: 48870, attack: 3702, defense: 2220, criticalRating: 1776, criticalDamageRating: 5034, armor: 2220, blockProficiency: 18297, energyResistance: 0, physicalResistance: 0 },
      7: { health: 96330, attack: 7296, defense: 4374, criticalRating: 3499, criticalDamageRating: 9918, armor: 4374, blockProficiency: 36064, energyResistance: 0, physicalResistance: 0 }
    }
  },

  // MUTANT CHAMPIONS (5)
  {
    id: '9',
    name: 'Wolverine',
    class: ChampionClass.MUTANT,
    stars: 4,
    image: '/images/Wolverine_Weapon_X_portrait.jpeg',
    featured_image: '/images/featured/Wolverine_Weapon_X_featured.jpeg',
    description: 'The best there is at what he does, with adamantium claws and healing factor.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3780, attack: 285, defense: 173, criticalRating: 137, criticalDamageRating: 388, armor: 115, blockProficiency: 1385, energyResistance: 0, physicalResistance: 0 },
      3: { health: 6470, attack: 489, defense: 296, criticalRating: 235, criticalDamageRating: 665, armor: 197, blockProficiency: 2370, energyResistance: 0, physicalResistance: 0 },
      4: { health: 12940, attack: 978, defense: 592, criticalRating: 470, criticalDamageRating: 1331, armor: 394, blockProficiency: 4740, energyResistance: 0, physicalResistance: 0 },
      5: { health: 25560, attack: 1932, defense: 1170, criticalRating: 929, criticalDamageRating: 2630, armor: 779, blockProficiency: 9360, energyResistance: 0, physicalResistance: 0 },
      6: { health: 50520, attack: 3820, defense: 2315, criticalRating: 1837, criticalDamageRating: 5200, armor: 1540, blockProficiency: 18480, energyResistance: 0, physicalResistance: 0 },
      7: { health: 99540, attack: 7525, defense: 4560, criticalRating: 3618, criticalDamageRating: 10244, armor: 3040, blockProficiency: 36400, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '10',
    name: 'Storm',
    class: ChampionClass.MUTANT,
    stars: 4,
    image: '/images/Storm_PyramidX_portrait.jpeg',
    featured_image: '/images/featured/Storm_PyramidX_featured.jpeg',
    description: 'Weather goddess with control over lightning, wind, and atmospheric conditions.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3450, attack: 298, defense: 165, criticalRating: 143, criticalDamageRating: 402, armor: 110, blockProficiency: 1265, energyResistance: 0, physicalResistance: 0 },
      3: { health: 5895, attack: 510, defense: 282, criticalRating: 245, criticalDamageRating: 688, armor: 188, blockProficiency: 2163, energyResistance: 0, physicalResistance: 0 },
      4: { health: 11790, attack: 1020, defense: 564, criticalRating: 490, criticalDamageRating: 1376, armor: 376, blockProficiency: 4326, energyResistance: 0, physicalResistance: 0 },
      5: { health: 23277, attack: 2014, defense: 1113, criticalRating: 967, criticalDamageRating: 2714, armor: 742, blockProficiency: 8543, energyResistance: 0, physicalResistance: 0 },
      6: { health: 45948, attack: 3975, defense: 2197, criticalRating: 1908, criticalDamageRating: 5356, armor: 1464, blockProficiency: 16860, energyResistance: 0, physicalResistance: 0 },
      7: { health: 90552, attack: 7830, defense: 4329, criticalRating: 3761, criticalDamageRating: 10556, armor: 2886, blockProficiency: 33220, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '11',
    name: 'Magneto', // NEWER CHAMPION
    class: ChampionClass.MUTANT,
    stars: 4,
    image: '/images/Magneto_portrait.jpeg',
    featured_image: '/images/featured/Magneto_featured.jpeg',
    description: 'Master of magnetism with metal manipulation and electromagnetic control.',
    availableTiers: [4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      4: { health: 12690, attack: 956, defense: 597, criticalRating: 458, criticalDamageRating: 1298, armor: 398, blockProficiency: 4647, energyResistance: 0, physicalResistance: 0 },
      5: { health: 25074, attack: 1888, defense: 1179, criticalRating: 904, criticalDamageRating: 2562, armor: 786, blockProficiency: 9176, energyResistance: 0, physicalResistance: 0 },
      6: { health: 49506, attack: 3724, defense: 2327, criticalRating: 1783, criticalDamageRating: 5055, armor: 1552, blockProficiency: 18108, energyResistance: 0, physicalResistance: 0 },
      7: { health: 97596, attack: 7342, defense: 4588, criticalRating: 3515, criticalDamageRating: 9964, armor: 3058, blockProficiency: 35693, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '12',
    name: 'Omega Red', // NEWER CHAMPION
    class: ChampionClass.MUTANT,
    stars: 4,
    image: '/images/Omega_Red_portrait.jpeg',
    featured_image: '/images/featured/Omega_Red_featured.jpeg',
    description: 'Soviet super-soldier with death factor spores and carbonadium coils.',
    availableTiers: [5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      5: { health: 26880, attack: 1792, defense: 1240, criticalRating: 858, criticalDamageRating: 2433, armor: 827, blockProficiency: 9820, energyResistance: 0, physicalResistance: 0 },
      6: { health: 53088, attack: 3537, defense: 2448, criticalRating: 1693, criticalDamageRating: 4800, armor: 1632, blockProficiency: 19384, energyResistance: 0, physicalResistance: 0 },
      7: { health: 104652, attack: 6975, defense: 4825, criticalRating: 3338, criticalDamageRating: 9460, armor: 3217, blockProficiency: 38213, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '13',
    name: 'Kitty Pryde', // NEWER CHAMPION
    class: ChampionClass.MUTANT,
    stars: 4,
    image: '/images/Kitty_Pryde_portrait.jpeg',
    featured_image: '/images/featured/Kitty_Pryde_featured.jpeg',
    description: 'Phasing mutant with intangibility powers and quantum destabilization abilities.',
    availableTiers: [5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      5: { health: 21450, attack: 2145, defense: 1072, criticalRating: 1072, criticalDamageRating: 3003, armor: 536, blockProficiency: 8037, energyResistance: 0, physicalResistance: 0 },
      6: { health: 42372, attack: 4237, defense: 2118, criticalRating: 2118, criticalDamageRating: 5928, armor: 1059, blockProficiency: 15873, energyResistance: 0, physicalResistance: 0 },
      7: { health: 83490, attack: 8349, defense: 4174, criticalRating: 4174, criticalDamageRating: 11687, armor: 2087, blockProficiency: 31273, energyResistance: 0, physicalResistance: 0 }
    }
  },

  // SKILL CHAMPIONS (4)
  {
    id: '14',
    name: 'Black Widow',
    class: ChampionClass.SKILL,
    stars: 4,
    image: '/images/Black_Widow_Deadly_Origin_portrait.jpeg',
    featured_image: '/images/featured/Black_Widow_Deadly_Origin_featured.jpeg',
    description: 'Master spy and assassin with deadly precision and subterfuge abilities.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3240, attack: 285, defense: 151, criticalRating: 137, criticalDamageRating: 388, armor: 101, blockProficiency: 1190, energyResistance: 0, physicalResistance: 0 },
      3: { health: 5550, attack: 489, defense: 259, criticalRating: 235, criticalDamageRating: 665, armor: 173, blockProficiency: 2040, energyResistance: 0, physicalResistance: 0 },
      4: { health: 11100, attack: 978, defense: 518, criticalRating: 470, criticalDamageRating: 1331, armor: 346, blockProficiency: 4080, energyResistance: 0, physicalResistance: 0 },
      5: { health: 21920, attack: 1932, defense: 1024, criticalRating: 929, criticalDamageRating: 2630, armor: 683, blockProficiency: 8060, energyResistance: 0, physicalResistance: 0 },
      6: { health: 43320, attack: 3820, defense: 2024, criticalRating: 1837, criticalDamageRating: 5200, armor: 1349, blockProficiency: 15920, energyResistance: 0, physicalResistance: 0 },
      7: { health: 85440, attack: 7525, defense: 3990, criticalRating: 3618, criticalDamageRating: 10244, armor: 2660, blockProficiency: 31400, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '15',
    name: 'Hawkeye',
    class: ChampionClass.SKILL,
    stars: 4,
    image: '/images/Hawkeye_portrait.jpeg',
    featured_image: '/images/featured/Hawkeye_featured.jpeg',
    description: 'Master archer with perfect aim and a variety of specialized arrows.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3180, attack: 292, defense: 148, criticalRating: 141, criticalDamageRating: 399, armor: 98, blockProficiency: 1168, energyResistance: 0, physicalResistance: 0 },
      3: { health: 5445, attack: 501, defense: 254, criticalRating: 242, criticalDamageRating: 684, armor: 169, blockProficiency: 2001, energyResistance: 0, physicalResistance: 0 },
      4: { health: 10890, attack: 1002, defense: 508, criticalRating: 484, criticalDamageRating: 1368, armor: 338, blockProficiency: 4002, energyResistance: 0, physicalResistance: 0 },
      5: { health: 21507, attack: 1978, defense: 1003, criticalRating: 955, criticalDamageRating: 2701, armor: 667, blockProficiency: 7904, energyResistance: 0, physicalResistance: 0 },
      6: { health: 42459, attack: 3903, defense: 1980, criticalRating: 1885, criticalDamageRating: 5330, armor: 1317, blockProficiency: 15604, energyResistance: 0, physicalResistance: 0 },
      7: { health: 83682, attack: 7692, defense: 3902, criticalRating: 3716, criticalDamageRating: 10502, armor: 2596, blockProficiency: 30746, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '16',
    name: 'Nick Fury', // NEWER CHAMPION
    class: ChampionClass.SKILL,
    stars: 4,
    image: '/images/Nick_Fury_portrait.jpeg',
    featured_image: '/images/featured/Nick_Fury_featured.jpeg',
    description: 'S.H.I.E.L.D. director with tactical expertise and Life Model Decoys.',
    availableTiers: [4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      4: { health: 10650, attack: 1065, defense: 532, criticalRating: 511, criticalDamageRating: 1447, armor: 355, blockProficiency: 3905, energyResistance: 0, physicalResistance: 0 },
      5: { health: 21015, attack: 2101, defense: 1050, criticalRating: 1008, criticalDamageRating: 2856, armor: 700, blockProficiency: 7711, energyResistance: 0, physicalResistance: 0 },
      6: { health: 41490, attack: 4149, defense: 2074, criticalRating: 1990, criticalDamageRating: 5637, armor: 1383, blockProficiency: 15222, energyResistance: 0, physicalResistance: 0 },
      7: { health: 81762, attack: 8176, defense: 4088, criticalRating: 3924, criticalDamageRating: 11111, armor: 2725, blockProficiency: 30013, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '17',
    name: 'Shang-Chi', // NEWER CHAMPION
    class: ChampionClass.SKILL,
    stars: 4,
    image: '/images/Shang-Chi_portrait.jpeg',
    featured_image: '/images/featured/Shang-Chi_featured.jpeg',
    description: 'Master of Kung Fu with martial arts expertise and mystical ten rings power.',
    availableTiers: [5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      5: { health: 22890, attack: 2289, defense: 1144, criticalRating: 1030, criticalDamageRating: 2919, armor: 763, blockProficiency: 8584, energyResistance: 0, physicalResistance: 0 },
      6: { health: 45207, attack: 4520, defense: 2260, criticalRating: 2034, criticalDamageRating: 5759, armor: 1507, blockProficiency: 16944, energyResistance: 0, physicalResistance: 0 },
      7: { health: 89109, attack: 8910, defense: 4455, criticalRating: 4009, criticalDamageRating: 11354, armor: 2970, blockProficiency: 33403, energyResistance: 0, physicalResistance: 0 }
    }
  },

  // COSMIC CHAMPIONS (4)
  {
    id: '18',
    name: 'Thor',
    class: ChampionClass.COSMIC,
    stars: 4,
    image: '/images/Thor_Ragnarok_portrait.jpeg',
    featured_image: '/images/featured/Thor_Ragnarok_featured.jpeg',
    description: 'The God of Thunder from Asgard with his mighty hammer Mjolnir.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3900, attack: 312, defense: 178, criticalRating: 149, criticalDamageRating: 422, armor: 118, blockProficiency: 1430, energyResistance: 0, physicalResistance: 0 },
      3: { health: 6680, attack: 535, defense: 305, criticalRating: 256, criticalDamageRating: 725, armor: 203, blockProficiency: 2450, energyResistance: 0, physicalResistance: 0 },
      4: { health: 13360, attack: 1070, defense: 610, criticalRating: 513, criticalDamageRating: 1451, armor: 407, blockProficiency: 4900, energyResistance: 0, physicalResistance: 0 },
      5: { health: 26380, attack: 2115, defense: 1205, criticalRating: 1013, criticalDamageRating: 2867, armor: 803, blockProficiency: 9680, energyResistance: 0, physicalResistance: 0 },
      6: { health: 52120, attack: 4175, defense: 2380, criticalRating: 2000, criticalDamageRating: 5665, armor: 1587, blockProficiency: 19120, energyResistance: 0, physicalResistance: 0 },
      7: { health: 102780, attack: 8225, defense: 4690, criticalRating: 3942, criticalDamageRating: 11165, armor: 3127, blockProficiency: 37700, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '19',
    name: 'Captain Marvel',
    class: ChampionClass.COSMIC,
    stars: 4,
    image: '/images/captain_marvel.jpeg',
    featured_image: '/images/featured/Captain_Marvel_featured.jpeg',
    description: 'Carol Danvers with cosmic powers, energy projection, and binary form.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3720, attack: 318, defense: 182, criticalRating: 152, criticalDamageRating: 431, armor: 121, blockProficiency: 1364, energyResistance: 0, physicalResistance: 0 },
      3: { health: 6372, attack: 545, defense: 312, criticalRating: 261, criticalDamageRating: 739, armor: 208, blockProficiency: 2336, energyResistance: 0, physicalResistance: 0 },
      4: { health: 12744, attack: 1090, defense: 624, criticalRating: 522, criticalDamageRating: 1478, armor: 416, blockProficiency: 4672, energyResistance: 0, physicalResistance: 0 },
      5: { health: 25170, attack: 2153, defense: 1233, criticalRating: 1031, criticalDamageRating: 2920, armor: 822, blockProficiency: 9225, energyResistance: 0, physicalResistance: 0 },
      6: { health: 49686, attack: 4249, defense: 2434, criticalRating: 2034, criticalDamageRating: 5762, armor: 1622, blockProficiency: 18203, energyResistance: 0, physicalResistance: 0 },
      7: { health: 98016, attack: 8374, defense: 4797, criticalRating: 4010, criticalDamageRating: 11360, armor: 3199, blockProficiency: 35876, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '20',
    name: 'Hercules', // NEWER CHAMPION
    class: ChampionClass.COSMIC,
    stars: 4,
    image: '/images/Hercules_portrait.jpeg',
    featured_image: '/images/featured/Hercules_featured.jpeg',
    description: 'Olympian God with immense strength, immortality, and divine powers.',
    availableTiers: [5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      5: { health: 28950, attack: 2316, defense: 1289, criticalRating: 1105, criticalDamageRating: 3129, armor: 859, blockProficiency: 10865, energyResistance: 0, physicalResistance: 0 },
      6: { health: 57213, attack: 4577, defense: 2548, criticalRating: 2182, criticalDamageRating: 6182, armor: 1699, blockProficiency: 21455, energyResistance: 0, physicalResistance: 0 },
      7: { health: 112833, attack: 9026, defense: 5023, criticalRating: 4300, criticalDamageRating: 12183, armor: 3349, blockProficiency: 42304, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '21',
    name: 'Gorr', // NEWER CHAMPION
    class: ChampionClass.COSMIC,
    stars: 4,
    image: '/images/Gorr_portrait.jpeg',
    featured_image:'/images/featured/Gorr_featured.jpeg',
    description: 'The God Butcher with the All-Black Necrosword and divine slaying abilities.',
    availableTiers: [6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      6: { health: 54360, attack: 4893, defense: 2446, criticalRating: 2202, criticalDamageRating: 6237, armor: 1631, blockProficiency: 20384, energyResistance: 0, physicalResistance: 0 },
      7: { health: 107154, attack: 9639, defense: 4819, criticalRating: 4337, criticalDamageRating: 12294, armor: 3213, blockProficiency: 40196, energyResistance: 0, physicalResistance: 0 }
    }
  },

  // MYSTIC CHAMPIONS (4)
  {
    id: '22',
    name: 'Doctor Strange',
    class: ChampionClass.MYSTIC,
    stars: 4,
    image: '/images/Doctor_Strange_portrait.jpeg',
    featured_image: '/images/featured/Doctor_Strange_featured.jpeg',
    description: 'The Sorcerer Supreme with mastery over the mystic arts and dimensional magic.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3600, attack: 276, defense: 167, criticalRating: 132, criticalDamageRating: 374, armor: 111, blockProficiency: 1320, energyResistance: 0, physicalResistance: 0 },
      3: { health: 6160, attack: 472, defense: 286, criticalRating: 226, criticalDamageRating: 641, armor: 191, blockProficiency: 2260, energyResistance: 0, physicalResistance: 0 },
      4: { health: 12320, attack: 945, defense: 572, criticalRating: 453, criticalDamageRating: 1283, armor: 381, blockProficiency: 4520, energyResistance: 0, physicalResistance: 0 },
      5: { health: 24340, attack: 1866, defense: 1130, criticalRating: 895, criticalDamageRating: 2534, armor: 753, blockProficiency: 8930, energyResistance: 0, physicalResistance: 0 },
      6: { health: 48080, attack: 3685, defense: 2233, criticalRating: 1768, criticalDamageRating: 5009, armor: 1489, blockProficiency: 17640, energyResistance: 0, physicalResistance: 0 },
      7: { health: 94800, attack: 7265, defense: 4405, criticalRating: 3485, criticalDamageRating: 9875, armor: 2936, blockProficiency: 34780, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '23',
    name: 'Scarlet Witch',
    class: ChampionClass.MYSTIC,
    stars: 4,
    image: '/images/Scarlet_Witch_portrait.jpeg',
    featured_image: '/images/featured/Scarlet_Witch_featured.jpeg',
    description: 'Wanda Maximoff with reality-warping chaos magic and probability manipulation.',
    availableTiers: [2, 3, 4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      2: { health: 3330, attack: 289, defense: 155, criticalRating: 138, criticalDamageRating: 391, armor: 103, blockProficiency: 1221, energyResistance: 0, physicalResistance: 0 },
      3: { health: 5700, attack: 495, defense: 265, criticalRating: 237, criticalDamageRating: 670, armor: 177, blockProficiency: 2093, energyResistance: 0, physicalResistance: 0 },
      4: { health: 11400, attack: 990, defense: 530, criticalRating: 475, criticalDamageRating: 1340, armor: 353, blockProficiency: 4186, energyResistance: 0, physicalResistance: 0 },
      5: { health: 22518, attack: 1956, defense: 1047, criticalRating: 937, criticalDamageRating: 2644, armor: 698, blockProficiency: 8267, energyResistance: 0, physicalResistance: 0 },
      6: { health: 44442, attack: 3863, defense: 2067, criticalRating: 1849, criticalDamageRating: 5220, armor: 1378, blockProficiency: 16322, energyResistance: 0, physicalResistance: 0 },
      7: { health: 87651, attack: 7616, defense: 4077, criticalRating: 3645, criticalDamageRating: 10290, armor: 2715, blockProficiency: 32174, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '24',
    name: 'Doom', // NEWER CHAMPION
    class: ChampionClass.MYSTIC,
    stars: 4,
    image: '/images/Doctor_Doom_portrait.jpeg',
    featured_image: '/images/featured/Doctor_Doom_featured.jpeg',
    description: 'Victor Von Doom with mastery of science, sorcery, and technological supremacy.',
    availableTiers: [4, 5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      4: { health: 13980, attack: 932, defense: 621, criticalRating: 421, criticalDamageRating: 1193, armor: 414, blockProficiency: 5127, energyResistance: 0, physicalResistance: 0 },
      5: { health: 27603, attack: 1840, defense: 1227, criticalRating: 831, criticalDamageRating: 2353, armor: 818, blockProficiency: 10121, energyResistance: 0, physicalResistance: 0 },
      6: { health: 54507, attack: 3634, defense: 2423, criticalRating: 1641, criticalDamageRating: 4645, armor: 1615, blockProficiency: 19979, energyResistance: 0, physicalResistance: 0 },
      7: { health: 107478, attack: 7165, defense: 4777, criticalRating: 3234, criticalDamageRating: 9158, armor: 3184, blockProficiency: 39374, energyResistance: 0, physicalResistance: 0 }
    }
  },
  {
    id: '25',
    name: 'Wong', // NEWER CHAMPION
    class: ChampionClass.MYSTIC,
    stars: 4,
    image: '/images/Wong_portrait.jpeg',
    featured_image: '/images/featured/Wong_featured.jpeg',
    description: 'Master of the Mystic Arts with spell-casting expertise and dimensional portal mastery.',
    availableTiers: [5, 6, 7],
    hasAwakening: true,
    maxSignatureLevel: 200,
    stats: {
      5: { health: 23760, attack: 1782, defense: 1188, criticalRating: 851, criticalDamageRating: 2409, armor: 792, blockProficiency: 8928, energyResistance: 0, physicalResistance: 0 },
      6: { health: 46926, attack: 3517, defense: 2345, criticalRating: 1680, criticalDamageRating: 4757, armor: 1563, blockProficiency: 17618, energyResistance: 0, physicalResistance: 0 },
      7: { health: 92541, attack: 6933, defense: 4622, criticalRating: 3311, criticalDamageRating: 9375, armor: 3081, blockProficiency: 34739, energyResistance: 0, physicalResistance: 0 }
    }
  }
];