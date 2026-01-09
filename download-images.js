const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Read the imagekit-urls.json file
const imagekitUrlsPath = path.join(__dirname, 'imagekit-urls.json');
const publicDir = path.join(__dirname, 'public');

// Function to sanitize filename - remove special characters
function sanitizeFilename(filename) {
  if (!filename) return filename;
  
  // Split filename and extension
  const lastDotIndex = filename.lastIndexOf('.');
  let name = filename;
  let extension = '';
  
  if (lastDotIndex > 0) {
    name = filename.substring(0, lastDotIndex);
    extension = filename.substring(lastDotIndex);
  }
  
  // Replace special characters with underscore or remove them
  // Keep only alphanumeric characters, hyphens, and underscores
  name = name.replace(/[^a-zA-Z0-9_-]/g, '_');
  
  // Remove multiple consecutive underscores
  name = name.replace(/_+/g, '_');
  
  // Remove leading/trailing underscores
  name = name.replace(/^_+|_+$/g, '');
  
  // If name is empty after sanitization, use a default name
  if (!name) {
    name = 'image_' + Date.now();
  }
  
  return name + extension;
}

// Function to extract filename from URL
function extractFilename(url) {
  try {
    // Get the part after the last slash
    const urlParts = url.split('/');
    let filename = urlParts[urlParts.length - 1];
    
    // Remove query parameters if any
    filename = filename.split('?')[0];
    
    // Remove timestamp prefix if present (e.g., "1747199958831-filename.jpg" -> "filename.jpg")
    // Pattern: numbers followed by dash at the start
    const timestampPattern = /^\d+-/;
    if (timestampPattern.test(filename)) {
      filename = filename.replace(timestampPattern, '');
    }
    
    // Sanitize the filename to remove special characters
    filename = sanitizeFilename(filename);
    
    return filename;
  } catch (error) {
    console.error(`Error extracting filename from ${url}:`, error.message);
    return null;
  }
}

// Function to download an image
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        
        fileStream.on('error', (err) => {
          fs.unlink(filePath, () => {}); // Delete the file on error
          reject(err);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to recursively process object and replace URLs with filenames
function processObject(obj, folderName, folderPath, localPaths, urlToFilenameMap) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => processObject(item, folderName, folderPath, localPaths, urlToFilenameMap));
  }
  
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.includes('imagekit.io')) {
      // Check if we've already processed this URL
      if (urlToFilenameMap.has(value)) {
        // Use the existing filename for this URL
        result[key] = urlToFilenameMap.get(value);
      } else {
        // Extract filename from URL
        const filename = extractFilename(value);
        if (filename) {
          const localPath = path.join(folderPath, filename);
          // Only add to download queue if not already added
          if (!localPaths.some(item => item.url === value)) {
            localPaths.push({ url: value, localPath, filename });
          }
          // Map URL to filename for future reference
          urlToFilenameMap.set(value, filename);
          result[key] = filename;
        } else {
          result[key] = value; // Keep original if extraction fails
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      result[key] = processObject(value, folderName, folderPath, localPaths, urlToFilenameMap);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// Main function to download images and create local paths JSON
async function downloadAllImages() {
  try {
    // Read imagekit-urls.json
    if (!fs.existsSync(imagekitUrlsPath)) {
      console.error('❌ imagekit-urls.json not found! Please run extract-imagekit-urls.js first.');
      return;
    }
    
    const imagekitData = JSON.parse(fs.readFileSync(imagekitUrlsPath, 'utf8'));
    const localPathsData = {};
    
    // Map to track unique URLs across all files (URL -> filename)
    const urlToFilenameMap = new Map();
    // Map to track URL -> array of all file paths where this URL should be placed
    const urlToAllPathsMap = new Map();
    // Set to track which URLs have already been downloaded
    const downloadedUrls = new Set();
    
    console.log('📥 Starting image download process...\n');
    
    // First pass: Process all files and collect unique URLs with all their target paths
    for (const [fileName, fileData] of Object.entries(imagekitData)) {
      console.log(`Processing ${fileName}...`);
      
      // Map locationPagesContent to subdomains folder name
      const folderName = fileName === 'locationPagesContent' ? 'subdomains' : fileName;
      const folderPath = path.join(publicDir, folderName);
      const localPaths = [];
      
      // Delete folder if it exists
      if (fs.existsSync(folderPath)) {
        console.log(`  Deleting existing folder: ${folderPath}`);
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
      
      // Create folder
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`  Created folder: ${folderPath}`);
      
      // Process the data structure and collect all image URLs
      const processedData = processObject(fileData, fileName, folderPath, localPaths, urlToFilenameMap);
      localPathsData[fileName] = processedData;
      
      // Track all paths for each URL (same URL might appear in multiple folders)
      for (const { url, localPath } of localPaths) {
        if (!urlToAllPathsMap.has(url)) {
          urlToAllPathsMap.set(url, []);
        }
        // Only add unique paths
        if (!urlToAllPathsMap.get(url).includes(localPath)) {
          urlToAllPathsMap.get(url).push(localPath);
        }
      }
    }
    
    // Second pass: Download each unique URL only once, then copy to all needed locations
    const uniqueUrls = Array.from(urlToAllPathsMap.keys());
    console.log(`\n📥 Downloading ${uniqueUrls.length} unique images (duplicates will be copied)...\n`);
    
    let successCount = 0;
    let failCount = 0;
    let copiedCount = 0;
    
    for (const url of uniqueUrls) {
      const allPaths = urlToAllPathsMap.get(url);
      const primaryPath = allPaths[0]; // First path is where we'll download
      const filename = path.basename(primaryPath);
      
      // Check if already downloaded
      if (downloadedUrls.has(url)) {
        // URL already processed, just copy to remaining paths
        for (let i = 1; i < allPaths.length; i++) {
          const targetPath = allPaths[i];
          if (fs.existsSync(primaryPath) && !fs.existsSync(targetPath)) {
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }
            fs.copyFileSync(primaryPath, targetPath);
            copiedCount++;
            console.log(`    📋 Copied: ${filename} to ${path.basename(path.dirname(targetPath))}/`);
          }
        }
        continue;
      }
      
      // Check if primary file already exists
      if (fs.existsSync(primaryPath)) {
        downloadedUrls.add(url);
        // Copy to other paths if needed
        for (let i = 1; i < allPaths.length; i++) {
          const targetPath = allPaths[i];
          if (!fs.existsSync(targetPath)) {
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }
            fs.copyFileSync(primaryPath, targetPath);
            copiedCount++;
            console.log(`    📋 Copied: ${filename} to ${path.basename(path.dirname(targetPath))}/`);
          }
        }
        continue;
      }
      
      // Download the image
      try {
        await downloadImage(url, primaryPath);
        downloadedUrls.add(url);
        successCount++;
        console.log(`    ✓ Downloaded: ${filename}`);
        
        // Copy to other paths if the same URL appears in multiple folders
        for (let i = 1; i < allPaths.length; i++) {
          const targetPath = allPaths[i];
          const targetDir = path.dirname(targetPath);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          fs.copyFileSync(primaryPath, targetPath);
          copiedCount++;
          console.log(`    📋 Copied: ${filename} to ${path.basename(targetDir)}/`);
        }
      } catch (error) {
        failCount++;
        console.error(`    ✗ Failed to download ${filename}: ${error.message}`);
      }
    }
    
    // Write local paths JSON file
    const localPathsPath = path.join(__dirname, 'local-image-paths.json');
    fs.writeFileSync(localPathsPath, JSON.stringify(localPathsData, null, 2), 'utf8');
    
    console.log(`\n✅ All downloads complete!`);
    console.log(`   ✓ Successfully downloaded: ${successCount}`);
    console.log(`   📋 Copied (duplicates): ${copiedCount}`);
    console.log(`   ✗ Failed: ${failCount}`);
    console.log(`📄 Local paths saved to: ${localPathsPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  downloadAllImages()
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.error('Error:', err.message);
      process.exit(1);
    });
}

module.exports = { downloadAllImages, extractFilename, downloadImage, sanitizeFilename };

