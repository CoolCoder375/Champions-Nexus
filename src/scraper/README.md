# MCOC Champion Scraper

This folder contains utilities to scrape champion data from external sources and update the app's champion database.

## Files

- `championScraper.ts` - Main scraping logic for extracting champion data
- `updateChampions.ts` - Script to update the champions.ts file with scraped data
- `README.md` - This documentation file

## Features

### ChampionScraper Class
- **scrapeChampionList()** - Scrapes the main champions listing page
- **scrapeChampionDetail()** - Scrapes detailed information for individual champions
- **scrapeAllChampions()** - Comprehensive scraping of all available champions
- **Rate limiting** - Built-in delays to be respectful to the target server
- **Error handling** - Robust error handling for network and parsing issues

### ChampionUpdater Class
- **updateChampionsData()** - Main update function
- **Backup system** - Creates backups before updating
- **Data merging** - Intelligently merges new data with existing champions
- **Validation** - Validates scraped data quality
- **Restore functionality** - Can restore from backup if update fails

## Usage

### Basic Scraping
```typescript
import { ChampionScraper } from './scraper/championScraper';

const scraper = new ChampionScraper();
const champions = await scraper.scrapeAllChampions();
console.log(`Scraped ${champions.length} champions`);
```

### Updating Champions Database
```typescript
import { runChampionUpdate } from './scraper/updateChampions';

// Update the champions.ts file with latest data
await runChampionUpdate();
```

### Command Line Usage
```bash
# Navigate to the scraper directory
cd src/scraper

# Run the update script
npx ts-node updateChampions.ts
```

## Data Structure

The scraper extracts and formats champion data according to our `Champion` interface:

```typescript
interface Champion {
  id: string;
  name: string;
  class: ChampionClass;
  stars: number;
  image: string;
  description: string;
  availableTiers: number[];
  stats: Record<number, ChampionStats>;
  hasAwakening: boolean;
  maxSignatureLevel: number;
}
```

## Stats Generation

Since the source website may not provide complete stats data, the scraper includes intelligent stat generation:

- **Realistic scaling** across different star tiers (2-7 stars)
- **Balanced progression** with appropriate multipliers per tier
- **Variance** to make champions feel unique
- **Complete stat coverage** for all required fields

## Safety Features

### Backup System
- Automatic backup creation before updates
- Restore functionality if updates fail
- Timestamped backup files

### Rate Limiting
- Built-in delays between requests (500ms default)
- Respectful scraping to avoid overloading the target server
- Configurable delay intervals

### Data Validation
- Validates all required fields are present
- Checks for reasonable stat values
- Ensures data integrity before file updates
- Detailed error reporting

### Error Handling
- Network error recovery
- Parsing error handling
- Graceful degradation
- Comprehensive logging

## Extending the Scraper

### Adding New Data Fields
1. Update the `Champion` interface in `types/Champion.ts`
2. Modify the scraping logic in `championScraper.ts`
3. Update the data generation methods
4. Test with validation

### Supporting Additional Sources
1. Create new scraper classes extending the base functionality
2. Implement source-specific parsing logic
3. Add source selection in the update script
4. Update documentation

### Custom Stats
1. Modify the `generateStatsForTiers()` method
2. Add champion-specific stat calculations
3. Implement real stat scraping if available
4. Add validation for new stat fields

## Configuration

### Scraper Settings
```typescript
// In championScraper.ts
private baseUrl = 'https://khonshu-ankh.vercel.app';
private delay = 500; // ms between requests
private maxChampions = 20; // Limit for testing
```

### File Paths
```typescript
// In updateChampions.ts
private championsFilePath = '../data/champions.ts';
private backupFilePath = '../data/champions.backup.ts';
```

## Best Practices

1. **Always backup** before running updates
2. **Test with small batches** before full scraping
3. **Respect rate limits** and server resources
4. **Validate data** before applying updates
5. **Monitor for changes** in the source website structure
6. **Keep logs** of scraping activities

## Troubleshooting

### Common Issues

**Network Errors**
- Check internet connection
- Verify target website is accessible
- Check for rate limiting or blocking

**Parsing Errors**
- Website structure may have changed
- Update CSS selectors and parsing logic
- Check for anti-scraping measures

**Data Quality Issues**
- Run validation after scraping
- Check for missing or invalid fields
- Verify stat ranges are reasonable

**File System Errors**
- Ensure write permissions
- Check disk space
- Verify file paths are correct

### Debug Mode
Enable detailed logging by setting debug flags in the scraper classes.

## Legal Considerations

- This scraper is for educational and personal use
- Respect the target website's robots.txt and terms of service
- Use appropriate rate limiting
- Consider reaching out to website owners for API access
- Be mindful of copyright and data usage rights

## Future Enhancements

- **API Integration** - Direct API access if available
- **Real-time Updates** - Automatic detection of new champions
- **Image Scraping** - Automatic download of champion images
- **Advanced Stats** - More detailed combat statistics
- **Ability Scraping** - Extract champion abilities and descriptions
- **Synergy Data** - Scrape champion synergy information
- **Tier Availability** - Detect actual available tiers per champion