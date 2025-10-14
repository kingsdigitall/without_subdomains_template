import { MetadataRoute } from 'next'
import contentData from "@/components/Content/ContactInfo.json"
 
export default function robots(): MetadataRoute.Robots {
  const BaseUrl = contentData.baseUrl
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${BaseUrl}sitemap.xml`,
  }
}