import { Metadata } from "next";
import React from "react";
import Page from "../components/Contact/Page";

import contactContent from "@/app/Data/content";

const ContactInfo: any = contactContent.contactContent;
const contentData: any = contactContent.contactPageContent;

export const metadata: Metadata = {
  title: {
    absolute: contentData.metaTitle?.split("[location]").join( ContactInfo.location)
    ?.split("[phone]").join(ContactInfo.No),
  },
  description: contentData.metaDescription?.split("[location]").join( ContactInfo.location)
  ?.split("[phone]").join(ContactInfo.No),
  alternates: {
     canonical: `${ContactInfo.baseUrl}contact/`,
  },
};

const page = () => {
  return (
    <div className="">
      <Page />
    </div>
  );
};

export default page;
