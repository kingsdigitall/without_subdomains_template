import Image from "next/image";
import React from "react";
import Link from "next/link";
import { MdDoubleArrow } from "react-icons/md";
import contactContent from "@/app/Data/content";

const ContactInfo: any = contactContent.contactContent;
const data1: any = contactContent.typesJsonContent;

const Types = ({ value }: { value?: any }) => {
  // Check if data1.metaTitle is null, undefined, or starts with "DEFAULT"
  if (
    !data1.metaTitle ||
    (typeof data1.metaTitle === "string" &&
      data1.metaTitle.startsWith("DEFAULT"))
  ) {
    return <div></div>;
  }

  const data = JSON.parse(
    JSON.stringify(data1.serviceData)
      .split(ContactInfo.location)
      .join(value || ContactInfo.location)
      .split("[phone]")
      .join(ContactInfo.No),
  );
  return (
    <div className=" px-4  pt-10 md:px-10">
      <h2 className="text-first text-center text-3xl font-bold text-main">
        {data.title}
      </h2>
      <div
        className="mt-4 px-4  text-center "
        dangerouslySetInnerHTML={{ __html: data.p }}
      ></div>
      <div className="mb-10  hidden flex-wrap justify-center   gap-10 md:flex">
        {data.lists?.map((items: any, index: number) => (
          <div
            className=" 1 mt-10 w-[22rem] overflow-hidden rounded-3xl border  border-gray-300 shadow-md duration-300 ease-in "
            key={index}
          >
            <div className="flex h-60 justify-center object-cover">
              <Image
                aria-hidden="true"
                src={`${items.imageUrl}`}
                alt={`${items.imageUrl.split("/").pop()?.split(".")[0] || "image"[0]}`}
                title={`${items.imageUrl.split("/").pop()?.split(".")[0] || "image"[0]}`}
                width="900"
                height="550"
                className="object-cover"
              />
            </div>
            <Link href={`/${items.slug}`}>
              <h3
                className={`1 group mt-4 flex justify-start  gap-2  px-4 text-xl font-bold text-main`}
              >
                <MdDoubleArrow className="text-bold text-3xl transition group-hover:translate-x-2 group-hover:text-main/70" />
                {items.title}
              </h3>
            </Link>
            <div
              className=" p-4 pl-4 text-justify text-base"
              dangerouslySetInnerHTML={{ __html: items.description }}
            ></div>
          </div>
        ))}
      </div>
      <div className="block pb-10 md:hidden">
        {data.lists.map((item: any) => (
          <div
            className=" rounded-2xl border   p-3 shadow-xl"
            key={item?.title}
          >
            <div className="flex items-center justify-start gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-full object-cover">
                <Image
                  aria-hidden="true"
                  src={`${item.imageUrl}`}
                  alt={`${item.imageUrl.split("/").pop()?.split(".")[0] || "image"}`}
                  title={`${item.imageUrl.split("/").pop()?.split(".")[0] || "image"}`}
                  width="900"
                  height="550"
                  className="h-14 w-14 object-cover "
                />
              </div>
              <div className="w-[75%]  text-lg font-bold text-main">
                {item.title}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Types;
