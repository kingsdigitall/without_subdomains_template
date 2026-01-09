const fs = require('fs');
const path = require('path');

// Directory containing JSON files
const contentDir = path.join(__dirname, 'components', 'Content');

// Function to find keys with imagekit.io values (recursive for nested objects)
function findImagekitKeys(obj, topLevelOnly = false) {
  const result = {};
  
  if (typeof obj !== 'object' || obj === null) {
    return result;
  }
  
  // Handle arrays - check each item for imagekit keys
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      if (typeof item === 'object' && item !== null) {
        const itemKeys = findImagekitKeys(item, topLevelOnly);
        Object.assign(result, itemKeys);
      }
    });
    return result;
  }
  
  // Handle objects - check direct properties
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.includes('imagekit.io')) {
      result[key] = value;
    } else if (!topLevelOnly && typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively check nested objects (but keep original key names)
      const nested = findImagekitKeys(value, false);
      // Merge nested keys with current level
      Object.assign(result, nested);
    }
  }
  
  return result;
}

// Function to process a single JSON file
function processJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    const fileName = path.basename(filePath, '.json');
    
    // Helper function to extract all imagekit URLs from a list item
    function extractImagekitUrlsFromItem(item) {
      const imageUrls = {};
      if (typeof item !== 'object' || item === null) return imageUrls;
      
      for (const [key, value] of Object.entries(item)) {
        if (typeof value === 'string' && value.includes('imagekit.io')) {
          imageUrls[key] = value;
        }
      }
      
      return imageUrls;
    }
    
    // For servicePage and typesPage, handle special nested structure
    if (fileName === 'servicePage' || fileName === 'typesPage') {
      const result = {
        lists: {}
      };
      
      // Include top-level bannerImage URL if it contains imagekit.io
      if (jsonData.bannerImage && typeof jsonData.bannerImage === 'string' && jsonData.bannerImage.includes('imagekit.io')) {
        result.bannerImage = jsonData.bannerImage;
      }
      
      // Extract all imagekit URLs from serviceData.lists array
      if (jsonData.serviceData && jsonData.serviceData.lists && Array.isArray(jsonData.serviceData.lists)) {
        jsonData.serviceData.lists.forEach((item, index) => {
          if (item && typeof item === 'object') {
            const imageUrls = extractImagekitUrlsFromItem(item);
            if (Object.keys(imageUrls).length > 0) {
              result.lists[index.toString()] = imageUrls;
            }
          }
        });
      }
      
      // If no bannerImage URL and no lists found, return empty structure
      if (!result.bannerImage && Object.keys(result.lists).length === 0) {
        return {};
      }
      
      return result;
    }
    
    // For locationPagesContent (subdomain content), handle nested structure with numeric indices
    if (fileName === 'locationPagesContent') {
      const result = {};
      
      // If it's an object with city keys
      if (typeof jsonData === 'object' && !Array.isArray(jsonData)) {
        let index = 0;
        Object.entries(jsonData).forEach(([cityKey, cityData]) => {
          if (typeof cityData === 'object' && cityData !== null) {
            // Find all imagekit keys in this city object (recursive)
            const cityImagekitKeys = findImagekitKeys(cityData, false);
            if (Object.keys(cityImagekitKeys).length > 0) {
              result[index.toString()] = cityImagekitKeys;
              index++;
            }
          }
        });
      }
      
      return result;
    }
    
    // For other files, find all keys with imagekit.io URLs (recursive to handle nested objects)
    const imagekitKeys = findImagekitKeys(jsonData, false);
    return imagekitKeys;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return {};
  }
}

// Main function
async function extractAllImagekitUrls() {
  const output = {};
  
  // Read all JSON files in the directory
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.json'));
  
  console.log(`Found ${files.length} JSON files to process...`);
  
  files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const fileName = path.basename(file, '.json');
    
    console.log(`Processing ${file}...`);
    const result = processJsonFile(filePath);
    
    if (Object.keys(result).length > 0) {
      output[fileName] = result;
    }
  });
  
  // Write output to a new JSON file
  const outputPath = path.join(__dirname, 'imagekit-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
  
  console.log(`\n✅ Extraction complete! Results saved to: ${outputPath}`);
  console.log(`\nTotal files processed: ${files.length}`);
  console.log(`Files with imagekit.io URLs: ${Object.keys(output).length}`);
  
  // Automatically run download script after extraction
  console.log(`\n🔄 Starting image download process...\n`);
  try {
    const { downloadAllImages } = require('./download-images');
    await downloadAllImages();
  } catch (err) {
    console.error('Error downloading images:', err.message);
    process.exit(1);
  }
  
  return output;
}

// Run the script
if (require.main === module) {
  extractAllImagekitUrls()
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.error('Error:', err.message);
      process.exit(1);
    });
}

module.exports = { extractAllImagekitUrls, processJsonFile };

