import Banner from "@/app/components/Home/Banner";
import React from "react";
import Image from "next/image";
import { headers } from "next/headers";
import { CheckCircle, XCircle } from "lucide-react";

import CtaSimple from "@/app/components/CtaSimple";
import Link from "next/link";
import ProcessWidget from "../Widgets/ProcessWidget";

import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const data: any = contactContent.typesJsonContent;
const content: any = subdomainContent.subdomainData;

const SubTypePage = ({ params }: any) => {
  const headersList = headers();
  const subdomain = headersList.get("x-subdomain");
  const Data: any = content[subdomain as keyof typeof content];
  
  // Extract abbreviation from subdomain slug
  const abbreviation = subdomain?.split("-").pop()?.toUpperCase();
  
  // Create location name with abbreviation if available
  const locationName = Data?.name 
    ? (abbreviation ? `${Data.name}, ${abbreviation}` : Data.name) 
    : ContactInfo.location;
  const Servicedata = JSON.parse(
    JSON.stringify(data?.serviceData)
      .split(ContactInfo.location)
      .join(locationName)
      .split("[phone]")
      .join(ContactInfo.No),
  );
  const serviceData: any = Servicedata.lists.find(
    (service: any) => service.slug === params.types,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <Banner
        h1={serviceData.title}
        header=""
        p1={serviceData.shortDescription}
      />
      <div className="container mx-auto max-w-[1400px] px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 rounded-2xl bg-white p-10 md:grid-cols-2 ">
          <div>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-main">
              {serviceData.h2}
            </h2>
            <div
              className="text-lg leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: serviceData.p2 }}
            />
          </div>
          <div className="flex justify-center">
            <Image
              src={serviceData.h2Image}
              className="h-72 w-full rounded-xl border  border-gray-100 object-cover"
              alt={serviceData.title.split("/").pop()?.split(".")[0] || "image"}
              width={400}
              height={288}
            />
          </div>
        </div>
        {/* Overview Section */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <Image
              src={serviceData.overViewImage}
              className="h-72 w-full rounded-xl border  border-gray-100 object-cover"
              alt={serviceData.title.split("/").pop()?.split(".")[0] || "image"}
              width={400}
              height={288}
            />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-main">
              {serviceData?.overViewHeading}
            </h2>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: serviceData?.overViewContent }}
            />
          </div>
        </div>
        {/* Selection Section */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-main/20 bg-main p-10 text-white shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">
              {serviceData.leftSection.title}
            </h2>
            <div className="mb-2 text-lg opacity-90">
              {serviceData.leftSection.description}
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold text-main">
              {serviceData.rightSection.title}
            </h2>
            <div className="mb-2 text-lg text-gray-700">
              {serviceData.rightSection.description}
            </div>
            {/* <Link
              href="#"
              className="font-semibold text-green-700 hover:underline"
            >
              Download Size Guide &rarr;
            </Link> */}
          </div>
        </div>
        {/* Compare Section */}
        <section className=" mb-16 px-6 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-2xl font-bold text-main">
              {serviceData?.comapreHeading}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8  transition hover:shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-green-700">
                  {serviceData.allowedHeading}
                </h3>
                <div className="space-y-4">
                  {serviceData.allowedItems.map((item: any, index: number) => (
                    <div
                      key={`allowed-${index}`}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle className="mt-1 h-6 w-6 text-green-600" />
                      <p className="text-base leading-relaxed text-gray-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-8  transition hover:shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-red-700">
                  {serviceData.prohibitedHeading}
                </h3>
                <div className="space-y-4">
                  {serviceData.prohibitedItems.map(
                    (item: any, index: number) => (
                      <div
                        key={`prohibited-${index}`}
                        className="flex items-start gap-4"
                      >
                        <XCircle className="mt-1 h-6 w-6 text-red-600" />
                        <p className="text-base leading-relaxed text-gray-700">
                          {item}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Ideal Section */}
        <div className="mx-auto mb-16 max-w-7xl rounded-3xl bg-white p-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-main md:text-3xl">
            {serviceData.idealHeading}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {serviceData.idealProjects.map((text: any, index: number) => (
              <div
                key={index}
                className="w-full rounded-xl border border-blue-100 bg-main p-6 text-center text-base font-medium text-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="mb-16">
          <CtaSimple />
        </div>
        {/* Process Section */}
        <div className="mb-16">
          <ProcessWidget />
        </div>
        {/* Types Section */}
        <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-main">
            {serviceData.tyesHeading}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {Servicedata.lists
              .filter((Item: any) => Item.slug !== params.types)
              .map((type: any, idx: number) => (
                <Link
                  href={`/${type.slug}`}
                  key={idx}
                  className="group flex w-48 flex-col items-center rounded-lg border  border-gray-200 bg-gray-100 p-6 transition hover:bg-main hover:text-white hover:shadow-lg"
                >
                  <Image
                    src={serviceData.idealImage}
                    width={56}
                    height={56}
                    alt={type.title}
                    className="mb-2 w-16 rounded-full   object-cover "
                  />
                  <span className="text-center font-bold ">{type.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubTypePage;
