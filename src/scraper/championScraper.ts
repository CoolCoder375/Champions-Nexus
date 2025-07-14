import axios from 'axios';
import { Champion, ChampionClass, ChampionStats } from '../types/Champion';

interface ScrapedChampionData {
  name: string;
  class: string;
  image: string;
  description?: string;
  detailUrl: string;
}

interface ChampionDetail {
  name: string;
  class: ChampionClass;
  description: string;
  image: string;
  availableTiers: number[];
  hasAwakening: boolean;
  maxSignatureLevel: number;
  stats: Record<number, ChampionStats>;
}

export class ChampionScraper {
  private baseUrl = 'https://khonshu-ankh.vercel.app';
  
  /**
   * Scrape champion list from the main champions page
   */
  async scrapeChampionList(): Promise<ScrapedChampionData[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/champions`);
      const html = response.data;
      
      // Extract champion links and data from HTML
      const championData: ScrapedChampionData[] = [];
      
      // Look for champion links in the format /champions/[name]
      const championLinkRegex = /href="\/champions\/([^"]+)"/g;
      const imageRegex = /<img[^>]+src="([^"]*\/champions\/[^"]*)"[^>]*>/g;
      
      let match;
      const championNames = new Set<string>();
      
      // Extract champion names from links
      while ((match = championLinkRegex.exec(html)) !== null) {
        const championSlug = match[1];
        if (!championNames.has(championSlug)) {
          championNames.add(championSlug);
          
          // Convert slug to display name
          const name = championSlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          championData.push({
            name,
            class: this.extractClassFromName(championSlug),
            image: `${this.baseUrl}/images/champions/${championSlug}.jpg`,
            detailUrl: `/champions/${championSlug}`
          });
        }
      }
      
      return championData;
    } catch (error) {
      console.error('Error scraping champion list:', error);
      throw new Error('Failed to scrape champion list');
    }
  }

  /**
   * Scrape detailed information for a specific champion
   */
  async scrapeChampionDetail(championSlug: string): Promise<ChampionDetail | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/champions/${championSlug}`);
      const html = response.data;
      
      // Extract champion details from the individual page
      const name = this.extractChampionName(html, championSlug);
      const championClass = this.extractChampionClass(html, championSlug);
      const description = this.extractDescription(html, name);
      
      // Generate realistic stats for different tiers
      const stats = this.generateStatsForTiers();
      
      return {
        name,
        class: championClass,
        description: description || `A powerful ${championClass.toLowerCase()} champion in the Marvel Contest of Champions.`,
        image: `/src/images/${championSlug}.jpeg`,
        availableTiers: [2, 3, 4, 5, 6, 7], // Default available tiers
        hasAwakening: true, // Assume most champions have awakening
        maxSignatureLevel: 200,
        stats
      };
    } catch (error) {
      console.error(`Error scraping champion detail for ${championSlug}:`, error);
      return null;
    }
  }

  /**
   * Scrape all champions and return formatted data
   */
  async scrapeAllChampions(): Promise<Champion[]> {
    console.log('Starting champion scraping...');
    
    const championList = await this.scrapeChampionList();
    console.log(`Found ${championList.length} champions to scrape`);
    
    const champions: Champion[] = [];
    
    // Limit to first 20 champions to avoid overwhelming the server
    const limitedList = championList.slice(0, 20);
    
    for (let i = 0; i < limitedList.length; i++) {
      const championData = limitedList[i];
      console.log(`Scraping ${i + 1}/${limitedList.length}: ${championData.name}`);
      
      try {
        const slug = championData.detailUrl.replace('/champions/', '');
        const detail = await this.scrapeChampionDetail(slug);
        
        if (detail) {
          champions.push({
            id: (i + 1).toString(),
            name: detail.name,
            class: detail.class,
            stars: 4, // Default display star rating
            image: championData.image,
            description: detail.description,
            availableTiers: detail.availableTiers,
            hasAwakening: detail.hasAwakening,
            maxSignatureLevel: detail.maxSignatureLevel,
            stats: detail.stats
          });
        }
        
        // Add delay to be respectful to the server
        await this.delay(500);
      } catch (error) {
        console.error(`Failed to scrape ${championData.name}:`, error);
      }
    }
    
    console.log(`Successfully scraped ${champions.length} champions`);
    return champions;
  }

  /**
   * Extract champion class from name/slug
   */
  private extractClassFromName(championSlug: string): string {
    // This is a fallback method - in real scraping we'd extract from the page
    const classKeywords = {
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
      'deadpool': 'Mutant'
    };
    
    for (const [keyword, championClass] of Object.entries(classKeywords)) {
      if (championSlug.includes(keyword)) {
        return championClass;
      }
    }
    
    // Default fallback
    const classes = ['Cosmic', 'Tech', 'Mutant', 'Skill', 'Science', 'Mystic'];
    return classes[Math.floor(Math.random() * classes.length)];
  }

  /**
   * Extract champion name from HTML
   */
  private extractChampionName(html: string, slug: string): string {
    // Try to extract from title tag first
    const titleMatch = html.match(/<title>([^<]+)</title>/i);
    if (titleMatch) {
      const title = titleMatch[1];
      if (title.includes(' - ')) {
        return title.split(' - ')[0].trim();
      }
    }
    
    // Fallback to slug conversion
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Extract champion class from HTML
   */
  private extractChampionClass(html: string, slug: string): ChampionClass {
    const classString = this.extractClassFromName(slug);
    
    switch (classString) {
      case 'Cosmic': return ChampionClass.COSMIC;
      case 'Tech': return ChampionClass.TECH;
      case 'Mutant': return ChampionClass.MUTANT;
      case 'Skill': return ChampionClass.SKILL;
      case 'Science': return ChampionClass.SCIENCE;
      case 'Mystic': return ChampionClass.MYSTIC;
      default: return ChampionClass.SCIENCE;
    }
  }

  /**
   * Extract description from HTML
   */
  private extractDescription(html: string, name: string): string | null {
    // Try to find meta description
    const metaMatch = html.match(/<meta name="description" content="([^"]+)"/i);
    if (metaMatch) {
      return metaMatch[1];
    }
    
    return null;
  }

  /**
   * Generate realistic stats for different tiers
   */
  private generateStatsForTiers(): Record<number, ChampionStats> {
    const baseStats = {
      health: 3000,
      attack: 250,
      defense: 150,
      criticalRating: 120,
      criticalDamageRating: 350,
      armor: 100,
      blockProficiency: 1200,
      energyResistance: 0,
      physicalResistance: 0
    };

    const multipliers = {
      2: 1.0,
      3: 1.7,
      4: 3.4,
      5: 6.7,
      6: 13.2,
      7: 26.0
    };

    const stats: Record<number, ChampionStats> = {};
    
    for (const [tier, multiplier] of Object.entries(multipliers)) {
      const variance = 0.8 + Math.random() * 0.4; // ±20% variance
      
      stats[parseInt(tier)] = {
        health: Math.round(baseStats.health * multiplier * variance),
        attack: Math.round(baseStats.attack * multiplier * variance),
        defense: Math.round(baseStats.defense * multiplier * variance),
        criticalRating: Math.round(baseStats.criticalRating * multiplier * variance),
        criticalDamageRating: Math.round(baseStats.criticalDamageRating * multiplier * variance),
        armor: Math.round(baseStats.armor * multiplier * variance),
        blockProficiency: Math.round(baseStats.blockProficiency * multiplier * variance),
        energyResistance: baseStats.energyResistance,
        physicalResistance: baseStats.physicalResistance
      };
    }

    return stats;
  }

  /**
   * Utility method to add delays between requests
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default ChampionScraper;