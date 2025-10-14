import Image from "next/image";
import Banner from "./Banner";
import WhyChoose from "./WhyChoose";
import HourCta from "./HourCta";
import Faq from "./Faq";
import Service from "@/app/components/Home/Service";
import Affordable from "./Affordable";
import ProcessWidget from "../Widgets/ProcessWidget";
import AreaWeServe from "../Widgets/AreaWeServe";
import ReviewWidget from "../Widgets/ReviewWidget";
import Types from "../Widgets/Types";

import contactContent from "@/app/Data/content";
import SubdomainContent from "@/app/Data/FinalContent";

const ContactInfo: any = contactContent.contactContent;
const homeData: any = contactContent.homePageContent;
const content: any = SubdomainContent.subdomainData;

const Hero = () => {
  const cityData: any = content;
  const slugs: any = Object.keys(cityData).map((key) => cityData[key]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${ContactInfo.name}`,
    image:
      `${ContactInfo?.logoImage}` || "",
    "@id": `${ContactInfo.baseUrl}`,
    url: `${ContactInfo.baseUrl}`,
    telephone: `${ContactInfo.No}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ContactInfo.address.split(",")[0].trim(),
      addressLocality: ContactInfo.location.split(",")[0].trim(),
      addressRegion: ContactInfo.location.split(",")[1].trim(),
      postalCode: ContactInfo.zipCode.trim(),
      addressCountry: "United States",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:30",
        closes: "12:32",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.7,
      reviewCount: 76,
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "#book_now",
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: `https://${ContactInfo.host}#Appointment`,
      },
    },
  };
  return (
    <div className="w-screen overflow-hidden  md:flex md:w-full md:flex-col md:items-center md:justify-center">
      <div className="w-full overflow-hidden text-lg  print:hidden  dark:bg-white dark:text-black">
      <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </section>
        {/* poster */}
        <Banner
          h1={homeData.h1Banner}
          image={homeData.bannerImage}
          header={homeData.bannerQuote}
          p1={homeData.metaDescription}
        />
        {/* poster */}
        {/* Section 1 */}
        <div className="my-10 grid  grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-24">
          <div className="flex flex-col justify-center    ">
            <h2 className="text-first text-3xl font-bold">{homeData.h2}</h2>
            <div
              className="mt-4  text-justify"
              dangerouslySetInnerHTML={{ __html: homeData.p2 }}
            ></div>
          </div>
          <div className="">
            <Image
              height={10000}
              width={10000}
              src={`${homeData.h2Image}`}
              className=" h-full w-full rounded-lg object-cover shadow-lg"
              alt={homeData.h2Image.split("/").pop()?.split(".")[0] || "image"}
              title={homeData.h2Image.split("/").pop()?.split(".")[0] || "image"}
            />
          </div>
        </div>
        {/* Section 1 */}
        {/* TYPES */}
        <Types />
        <Service />
        {/* TYPES*/}
        <Affordable />
        {/* Section 4 */}
        <WhyChoose data={homeData.whyChooseSection} />
        {/* Section 4 */}
        <ProcessWidget />
        {/* Area we Serve */}
        <div className="mx-auto mt-14 max-w-[95rem] md:mt-20">
          <div className="mt-10 flex h-96 rounded-xl  bg-white   shadow-inner shadow-minor md:mb-10">
            <div className="md:w-[87%]">
              <div className="mt-4 p-1 text-center text-2xl font-bold text-main">
                We Proudly Serve{" "}
                <span className="text-mai">The Following Areas</span>
              </div>
              <AreaWeServe slugs={slugs} />
            </div>
            <div className="hidden h-full w-full md:flex">
              <HourCta />
            </div>
          </div>
        </div>
        {/* Area we Serve */}
        {/* CTA */}
        <div className="mt-14 md:mt-20"></div>
        {/* CTA */}
        {/* FAQ */}
        <Faq  data={homeData.faq}/>
        {/* FAQ */}
        {/* Review */}
        <ReviewWidget />
        {/* Review */}
        {/* -----------------------------------------Map End---------------------------- */}
        <div className="block w-full  ">
          <div className=" mt-20 overflow-hidden rounded-xl border">
            <iframe
              title="Google Map"
              height="350"
              width={"100%"}
              src={`https://maps.google.com/maps?q=Louisville+Kentucky&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
            ></iframe>
          </div>
        </div>
        {/* -----------------------------------------Map End---------------------------- */}
      </div>
    </div>
  );
};

export default Hero;
