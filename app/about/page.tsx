import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import Banner from "@/app/components/Home/Banner";
import contactContent from "@/app/Data/content";

const ContactInfo: any = contactContent.contactContent;
const aboutContent: any = contactContent.aboutContent
export const metadata: Metadata = {
  title: {
    absolute: aboutContent.metaTitle
      ?.split("[location]")
      .join(ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No),
  },
  description: aboutContent.metaDescription
    ?.split("[location]")
    .join(ContactInfo.location)
    ?.split("[phone]")
    .join(ContactInfo.No),
  alternates: {
    canonical: `${ContactInfo.baseUrl}about/`,
  },
};
const page = () => {
  return (
    <div className="">
      <div className="max-[1200px] flex flex-col items-center justify-center bg-white text-black">
        <div className="max-[1200px] flex flex-col items-center justify-center  bg-white text-black ">
          <div className="  w-screen min-w-[375px] cursor-default  text-lg md:w-full">
            {/* poster */}
            <Banner
              h1={aboutContent.h1Banner
                }
              image={aboutContent.bannerImage}
              header={aboutContent.bannerQuote}
              p1={aboutContent.metaDescription
                ?.split("[location]")
                .join(ContactInfo.location)
                ?.split("[phone]")
                .join(ContactInfo.No)}
            />
            {/* poster */}
            {/* -----------------------------------------About Start------------------------ */}
            <div className="mx-4 mt-6 print:hidden md:mx-10">
              {/* who */}
              <div className="my-20 grid  w-full grid-cols-1 items-center justify-center gap-6 px-8 md:grid-cols-2">
                <div className="flex flex-col justify-center    ">
                  <div className="text-">ABOUT </div>
                  <h2 className="text-3xl font-bold ">
                    {" "}
                    Who We Are?<br></br>
                  </h2>
                  <div className="mt-6 "></div>
                  <div
                    className="  text-justify"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent.p2
                        ?.split("[location]")
                        .join(ContactInfo.location)
                        ?.split("[phone]")
                        .join(ContactInfo.No),
                    }}
                  ></div>
                </div>
                <div className="w-full pt-10">
                  <Image
                    src={`${aboutContent.h2Image}`}
                    className="rounded-lg border object-cover  shadow-lg "
                    alt={
                      aboutContent.h2Image.split("/").pop()?.split(".")[0] ||
                      "image"
                    }
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              {/* who */}
            </div>
            {/* -----------------------------------------About End------------------------ */}
            {/* Mission */}
            <div className="relative mx-4 mt-6 flex h-full flex-col gap-8 md:mx-10 md:flex-row  md:px-32">
              <div className="grid  w-full grid-cols-1 gap-8 rounded-lg p-4 md:grid-cols-3 ">
                <div className="rounded-lg border-[3px]  border-main duration-300 ease-in-out  hover:bg-main hover:text-white ">
                  <h2 className="p-2 text-center text-2xl font-bold">
                    {aboutContent.missionSection[0].title}
                  </h2>
                  <div
                    className=" p-4 text-center"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent.missionSection[0].description
                        ?.split("[location]")
                        .join(ContactInfo.location)
                        ?.split("[phone]")
                        .join(ContactInfo.No),
                    }}
                  ></div>
                </div>

                <div className="rounded-lg border-[3px]  border-main bg-main  text-white duration-300 ease-in-out  hover:bg-transparent hover:text-black ">
                  <h2 className="p-2 text-center text-2xl font-bold">
                    {aboutContent.missionSection[1].title}
                  </h2>
                  <div
                    className=" p-4 text-center"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent.missionSection[1].description
                        ?.split("[location]")
                        .join(ContactInfo.location)
                        ?.split("[phone]")
                        .join(ContactInfo.No),
                    }}
                  ></div>
                </div>

                <div className="rounded-lg border-[3px] border-main duration-300 ease-in-out  hover:bg-main hover:text-white ">
                  <h2 className="p-2 text-center text-2xl font-bold">
                    {aboutContent.missionSection[2].title}
                  </h2>
                  <div
                    className=" p-4 text-center"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent.missionSection[2].description
                        ?.split("[location]")
                        .join(ContactInfo.location)
                        ?.split("[phone]")
                        .join(ContactInfo.No),
                    }}
                  ></div>
                </div>
              </div>
            </div>
            {/* Mission */}
            {/* -----------------------------------------Conversation ------------------------ */}
            <div className="my-20">
              <div className={`text-center text-4xl font-extrabold text-main`}>
                Let&apos;s Start a Conversation
              </div>
              <div className="mt-4 border-double text-center">
                <button
                  id="cta-id"
                  className={`mt-3 rounded-lg bg-main px-4 py-3 font-bold tracking-wide text-white     shadow-lg hover:bg-minor`}
                >
                  <a id="cta-id" href={`tel:${ContactInfo.tel}`}>
                    {" "}
                    {ContactInfo.No}
                  </a>
                </button>
              </div>
            </div>
            {/* -----------------------------------------Conversation End------------------------ */}
            {/* all */}
            <div className="mx-4 my-20 md:mx-20">
              <div className="text-2xl font-bold ">
                <div className="flex justify-center gap-2 ">
                  <FaCrown className={`text-2xl text-main `} />
                  Areas We Serve
                </div>
              </div>
              <div
                className=" mt-2 text-center text-xl"
                dangerouslySetInnerHTML={{
                  __html: aboutContent.areaweserveSection.description
                    ?.split("[location]")
                    .join(ContactInfo.location)
                    ?.split("[phone]")
                    .join(ContactInfo.No),
                }}
              ></div>
              <div className="flex justify-center">
                <Link
                  href={`/areas-we-serve`}
                  className=" text-center text-xl font-bold text-main duration-150 ease-in hover:tracking-wide "
                >
                  {aboutContent.areaweserveSection.linkText}
                </Link>
              </div>
            </div>
            {/* all */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
