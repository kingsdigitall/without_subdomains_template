import React from "react";
import SubTypePage from "@/app/components/Types/SubTypePage";
import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";
import NotFound from "../not-found";

const ContactInfo: any = contactContent.contactContent;
const data: any = contactContent.typesJsonContent;
const content: any = subdomainContent.subdomainData;
const Servicedata = data?.serviceData;

export function generateMetadata({ params }: { params: { types: string } }) {
  const serviceData: any = Servicedata.lists.find(
    (service: any) => service.slug === params.types,
  );

  // Check if serviceData or serviceData.slug is invalid
  if (!serviceData || !serviceData.slug || serviceData.slug.trim() === "") {
    return {
      title: "404 - Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
  // console.log(data.serviceData.lists.map((item: any) => item.slug));
  return {
    title: serviceData.title
      ?.split("[location]")
      .join(ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No),
    description: serviceData.shortDescription
      ?.split("[location]")
      .join(ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No),
    alternates: {
      canonical: `https://${ContactInfo.host}/${params.types}/`,
    },
  };
}

const page = ({ params }: { params: { types: string } }) => {
  const serviceData: any = Servicedata.lists.find(
    (service: any) => service.slug === params.types,
  );

  // Check if serviceData or serviceData.slug is invalid and return 404
  if (!serviceData || !serviceData.slug || serviceData.slug.trim() === "") {
    return (
      <div className="">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="">
      <SubTypePage params={params} />
    </div>
  );
};

export default page;

export async function generateStaticParams() {
  const cityData: any = content;
  const subDomain = Object.keys(cityData);
  return data.serviceData.lists.map((locations: any) => ({
    types: locations.slug.toString(),
  }));
}
