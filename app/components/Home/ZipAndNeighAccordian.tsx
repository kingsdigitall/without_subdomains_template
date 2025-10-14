import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface ZipAndNeighAccordianProps {
  ques: string;
  ans: string[];
  slug: string;
  neighborhood?: boolean;
}

const ZipAndNeighAccordian = ({
  ques,
  ans,
  slug,
  neighborhood = false,
}: ZipAndNeighAccordianProps) => {
  // Convert hyphenated slug to title case (e.g., 'downtown-columbus' becomes 'Downtown Columbus')
  const formatLocationName = (locationSlug: string) => {
    return locationSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="mt-10">
      <Accordion type="multiple" className="md:w-2/3">
        <AccordionItem value={`item-1`} className="no-underline">
          <AccordionTrigger className="text-center text-2xl font-bold text-main hover:no-underline">
            {ques}
          </AccordionTrigger>
          <AccordionContent className="">
            <div className="mx-10 mt-4 flex h-fit w-auto flex-wrap justify-center gap-4">
              {ans.map((item: string) => (
                <div className="" key={item}>
                  <Link
                    target={neighborhood ? `` : `_blank`}
                    href={
                      neighborhood
                        ? `/${
                            item
                              .trim()
                              .toLowerCase()
                              .replace(/\.+$/, "") // remove trailing dots
                              .replace(/\s+/g, "-") // replace spaces with hyphens
                          }`
                        : `https://www.google.com/maps/search/?api=1&query=${item}, ${formatLocationName(slug)}`
                    }
                  >
                    <p className="border bg-minor px-2 py-1 text-white duration-100 ease-in-out hover:text-main">
                      {item}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ZipAndNeighAccordian;
