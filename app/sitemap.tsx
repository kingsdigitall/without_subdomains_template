import { MetadataRoute } from "next";
import contentData from "@/components/Content/ContactInfo.json";
// Removed import of data from subDomainUrlContent.json
import serviceData from "@/components/Content/servicePage.json";
import typesData from "@/components/Content/typesPage.json";
import { headers } from "next/headers";

// Define the async function to fetch subdomain data
async function getSubdomainData() {
  const headersList = headers();
  const proto: any = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("host");
  const baseUrl = `${proto}://${host}`;
  const res = await fetch(`${baseUrl}/api/subdomains`, { cache: "no-store" });
  return res.json().catch(() => ({}));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BaseUrl = contentData.baseUrl;
  // Fetch service slug data
  const ServiceSlug: any = serviceData.serviceData.lists.map((item: any) => item.slug);
  const TypesSlug: any = typesData.serviceData.lists.map((item: any) => item.slug);
  
  // Fetch subdomain data asynchronously
  const subdomainData = await getSubdomainData();
  const subdomains = subdomainData?.subdomains || [];
  
  // Generate city URLs
  const SubDomainURL = subdomains.map((city: any) => ({
    url: `${contentData.baseUrl}areas-we-serve/${city.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
  
  // Generate neighborhood URLs
  const NeighborhoodURLs: any[] = [];
  subdomains.forEach((city: any) => {
    if (city.neighbourhoods) {
      const neighborhoods = city.neighbourhoods.split("|");
      neighborhoods.forEach((neighborhood: string) => {
        const formattedNeighborhood = neighborhood
          .trim()
          .toLowerCase()
          .replace(/\.+$/, "") // remove trailing dots
          .replace(/\s+/g, "-"); // replace spaces with hyphens
        
        NeighborhoodURLs.push({
          url: `${contentData.baseUrl}areas-we-serve/${city.slug}/${formattedNeighborhood}/`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.9,
        });
      });
    }
  });
  
  const ServiceURL = ServiceSlug.map((location: any) => ({
    url: `${contentData.baseUrl}services/${location}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const TypesURL = TypesSlug.map((location: any) => ({
    url: `${contentData.baseUrl}services/${location}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  // console.log(ServiceSlug);

  return [
    {
      url: `${contentData.baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${contentData.baseUrl}about/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}contact/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}services/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...ServiceURL,
    ...TypesSlug,
    {
      url: `${contentData.baseUrl}areas-we-serve/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...SubDomainURL,
    ...NeighborhoodURLs,
  ];
}