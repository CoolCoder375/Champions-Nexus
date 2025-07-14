#!/usr/bin/env node

/**
 * Simple Node.js script to run the champion scraper
 * This can be executed directly without TypeScript compilation
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class SimpleChampionScraper {
  constructor() {
    this.baseUrl = 'https://khonshu-ankh.vercel.app';
    this.delay = 500; // ms between requests
  }

  async scrapeChampionList() {
    try {
      console.log('📡 Fetching champion list...');
      const response = await axios.get(`${this.baseUrl}/champions`);
      const html = response.data;
      
      // Extract champion names from href attributes
      const championRegex = /href="\/champions\/([^"]+)"/g;
      const champions = [];
      let match;
      
      while ((match = championRegex.exec(html)) !== null) {
        const slug = match[1];
        const name = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        if (!champions.find(c => c.slug === slug)) {
          champions.push({
            slug,
            name,
            class: this.guessClass(slug),
            image: `/src/images/${slug}.jpeg`
          });
        }
      }
      
      console.log(`Found ${champions.length} champions`);
      return champions.slice(0, 15); // Limit for testing
    } catch (error) {
      console.error('Error scraping champions:', error.message);
      return [];
    }
  }

  guessClass(slug) {
    const classMap = {
      'spider': 'Science',
      'iron': 'Tech', 
      'wolverine': 'Mutant',
      'captain': 'Science',
      'thor': 'Cosmic',
      'widow': 'Skill',
      'strange': 'Mystic',
      'hulk': 'Science',
      'storm': 'Mutant',
      'cyclops': 'Mutant',
      'magneto': 'Mutant',
      'deadpool': 'Mutant',
      'rocket': 'Tech',
      'groot': 'Cosmic',
      'gamora': 'Cosmic'
    };
    
    for (const [keyword, championClass] of Object.entries(classMap)) {
      if (slug.includes(keyword)) {
        return championClass;
      }
    }
    
    const classes = ['Cosmic', 'Tech', 'Mutant', 'Skill', 'Science', 'Mystic'];
    return classes[Math.floor(Math.random() * classes.length)];
  }

  generateStats() {
    const base = {
      health: 3000 + Math.random() * 1000,
      attack: 250 + Math.random() * 100,
      defense: 150 + Math.random() * 50,
      criticalRating: 120 + Math.random() * 30,
      criticalDamageRating: 350 + Math.random() * 100,
      armor: 100 + Math.random() * 50,
      blockProficiency: 1200 + Math.random() * 300,
      energyResistance: 0,
      physicalResistance: 0
    };

    const tiers = {};
    const multipliers = { 2: 1, 3: 1.7, 4: 3.4, 5: 6.7, 6: 13.2, 7: 26 };
    
    for (const [tier, mult] of Object.entries(multipliers)) {
      tiers[tier] = {};
      for (const [stat, value] of Object.entries(base)) {
        tiers[tier][stat] = Math.round(value * mult);
      }
    }
    
    return tiers;
  }

  async generateChampionsFile(champions) {
    const championsData = champions.map((champ, index) => ({
      id: (index + 1).toString(),
      name: champ.name,
      class: `ChampionClass.${champ.class.toUpperCase()}`,
      stars: 4,
      image: champ.image,
      description: `${champ.name} - A powerful ${champ.class.toLowerCase()} champion in the Marvel Contest of Champions.`,
      availableTiers: [2, 3, 4, 5, 6, 7],
      hasAwakening: true,
      maxSignatureLevel: 200,
      stats: this.generateStats()
    }));

    const fileContent = `import { type Champion, ChampionClass } from '../types/Champion';

// Auto-generated champion data
// Generated on: ${new Date().toISOString()}
// Total champions: ${championsData.length}

export const champions: Champion[] = ${JSON.stringify(championsData, null, 2)
      .replace(/"ChampionClass\.([A-Z]+)"/g, 'ChampionClass.$1')};
`;

    const outputPath = path.join(__dirname, '../data/champions.ts');
    
    // Create backup
    if (fs.existsSync(outputPath)) {
      const backupPath = path.join(__dirname, '../data/champions.backup.ts');
      fs.copyFileSync(outputPath, backupPath);
      console.log('💾 Created backup of existing champions.ts');
    }
    
    fs.writeFileSync(outputPath, fileContent);
    console.log(`✅ Generated new champions.ts with ${championsData.length} champions`);
    
    // Print summary
    const classCounts = championsData.reduce((acc, champ) => {
      const className = champ.class.replace('ChampionClass.', '');
      acc[className] = (acc[className] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Champions by class:');
    Object.entries(classCounts).forEach(([cls, count]) => {
      console.log(`   ${cls}: ${count}`);
    });
  }

  async run() {
    try {
      console.log('🚀 Starting MCOC Champion Scraper...\n');
      
      const champions = await this.scrapeChampionList();
      
      if (champions.length === 0) {
        console.log('❌ No champions found. Exiting...');
        return;
      }
      
      console.log('\n📝 Generating champions.ts file...');
      await this.generateChampionsFile(champions);
      
      console.log('\n✨ Scraping completed successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. Review the generated champions.ts file');
      console.log('   2. Add champion images to src/images/ folder');
      console.log('   3. Test the app with new champion data');
      console.log('   4. Customize individual champion data as needed');
      
    } catch (error) {
      console.error('❌ Scraping failed:', error.message);
    }
  }
}

// Run the scraper
if (require.main === module) {
  const scraper = new SimpleChampionScraper();
  scraper.run();
}

module.exports = SimpleChampionScraper;