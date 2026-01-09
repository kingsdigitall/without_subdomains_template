import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// DEFAULT: Import local images with error handling
let localImages: any = {};
try {
  localImages = require("@/local-image-paths.json");
} catch (error) {
  // local-image-paths.json not found, will use ImageKit URLs
  localImages = {};
}

function getValueOrDefault(value: any, defaultValue: any): any {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0)
  ) {
    return defaultValue;
  }
  return value;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const filePath = join(process.cwd(), 'components', 'Content', 'locationPagesContent.json');
    const fileData = readFileSync(filePath, 'utf-8');
    const subdomainsObject = JSON.parse(fileData);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Convert object to array and apply date filter
    // Create an array of keys to maintain consistent indexing
    const subdomainKeys = Object.keys(subdomainsObject);
    const subdomainsArray = subdomainKeys.map((key, index) => {
      const item = subdomainsObject[key] || {};
      // Ensure slug present
      if (!item.slug) {
        item.slug = key;
      }
      
      // Get local images for this subdomain using the same index order
      const localImage = localImages?.locationPagesContent?.[String(index) as keyof typeof localImages.locationPagesContent];
      
      // Define fallback defaults for all fields
      const baseFallback = {
        bannerImage: "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        h2Image: "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        h5Image: "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930"
      };
      
      // Update image URLs to use local paths if available
      return {
        ...item,
        bannerImage: getValueOrDefault(
          localImage?.bannerImage ? `/subdomains/${localImage.bannerImage}` : item.bannerImage,
          baseFallback.bannerImage
        ),
        h2Image: getValueOrDefault(
          localImage?.h2Image ? `/subdomains/${localImage.h2Image}` : item.h2Image,
          baseFallback.h2Image
        ),
        h5Image: getValueOrDefault(
          localImage?.h5Image ? `/subdomains/${localImage.h5Image}` : item.h5Image,
          baseFallback.h5Image
        )
      };
    });

    const filteredSubdomains = subdomainsArray
      .filter((entry: any) => {
        if (!entry || !entry.publishedAt) {
          // No publish date -> show by default
          return true;
        }
        const publishDate = new Date(entry.publishedAt);
        publishDate.setHours(0, 0, 0, 0);
        return publishDate <= today;
      })
      .sort((a: any, b: any) => {
        const aDate = a?.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bDate = b?.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return bDate - aDate;
      });

    if (filteredSubdomains.length === 0) {
      return NextResponse.json(
        { message: 'No published subdomains found for the current date', currentDate: todayStr },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        }
      );
    }

    return new NextResponse(JSON.stringify({
      subdomains: filteredSubdomains,
      currentDate: todayStr,
      totalSubdomains: filteredSubdomains.length,
    }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Error in subdomains route:', error);
    return NextResponse.json(
      { message: 'Error reading subdomains', error: String(error) },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
        }
      }
    );
  }
}


