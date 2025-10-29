// DEFAULT: Import statements with enhanced error handling for all JSON content files
let aboutData: any;
let contactPageDataJson: any;
let contactDataJson: any;
let homePageDataJson: any;
let locationPageDataJson: any;
let brandsDataJson: any;
let servicePageDataJson: any;
let typesJson: any;
let subDomainUrlContentJson: any;

// DEFAULT: Enhanced error handling with detailed console warnings
try {
  aboutData = require("@/components/Content/about.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load about.json, using comprehensive default values",
  );
  aboutData = {};
}



try {
  contactPageDataJson = require("@/components/Content/contact.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load contact.json, using default contact page content",
  );
  contactPageDataJson = {};
}

try {
  contactDataJson = require("@/components/Content/ContactInfo.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load ContactInfo.json, using default contact information",
  );
  contactDataJson = {};
}

try {
  homePageDataJson = require("@/components/Content/home.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load home.json, using default home page content",
  );
  homePageDataJson = {};
}

try {
  locationPageDataJson = require("@/components/Content/location.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load location.json, using default location content",
  );
  locationPageDataJson = {};
}

try {
  brandsDataJson = require("@/components/Content/ourBrand.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load ourBrand.json, using default brand information",
  );
  brandsDataJson = {};
}

try {
  servicePageDataJson = require("@/components/Content/servicePage.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load servicePage.json, using default service page content",
  );
  servicePageDataJson = {};
}

try {
  typesJson = require("@/components/Content/typesPage.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load typesPage.json, using default types page content",
  );
  typesJson = {};
}

try {
  subDomainUrlContentJson = require("@/components/Content/locationPagesContent.json");
} catch (error) {
  console.warn(
    "DEFAULT: Failed to load locationPagesContent.json, using default subdomain content",
  );
  subDomainUrlContentJson = {};
}

// DEFAULT: Comprehensive helper function to provide fallback for empty, null, or missing values
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

// DEFAULT: Enhanced helper function to ensure mission section has complete data with fallbacks
function ensureMissionSection(missionSection: any[]): any[] {
  const defaultMissionSections = [
    {
      title: "DEFAULT: Our Mission",
      description:
        "DEFAULT: Our mission is to provide top-tier dumpster rental services focused on safety, efficiency, and customer satisfaction in [location].",
    },
    {
      title: "DEFAULT: Our Vision",
      description:
        "DEFAULT: We're building the most reliable name in roll off dumpster rental in [location] by staying committed to clear communication, fast deliveries, and simple pricing.",
    },
    {
      title: "DEFAULT: Our Values",
      description:
        "DEFAULT: We believe in showing up on time, offering honest prices, protecting your property, and keeping your project or cleanup as smooth as possible.",
    },
  ];

  if (!Array.isArray(missionSection) || missionSection.length === 0) {
    return defaultMissionSections;
  }

  return missionSection.map((item: any, index: number) => ({
    title: getValueOrDefault(
      item?.title,
      defaultMissionSections[index]?.title || "DEFAULT: Our Mission",
    ),
    description: getValueOrDefault(
      item?.description,
      defaultMissionSections[index]?.description ||
        "DEFAULT: Our commitment to excellence in dumpster rental service in [location].",
    ),
  }));
}

// DEFAULT: Helper function to ensure FAQ array has complete data with fallbacks
function ensureFaqSection(faqSection: any[]): any[] {
  const defaultFaq = [
    {
      FAQ: "DEFAULT: How much does a dumpster rental cost in [location]?",
      Answer:
        "DEFAULT: Pricing depends on the dumpster size and how long you need it. We provide upfront quotes with no hidden charges.",
      question: "DEFAULT: How much does a dumpster rental cost in [location]?",
      answer:
        "DEFAULT: Pricing depends on the dumpster size and how long you need it. We provide upfront quotes with no hidden charges.",
    },
    {
      FAQ: "DEFAULT: What size dumpsters do you offer in [location]?",
      Answer:
        "DEFAULT: We offer 10-yard, 20-yard, 30-yard, and 40-yard dumpsters for all types of cleanups—from garage purges to construction projects.",
      question: "DEFAULT: What size dumpsters do you offer in [location]?",
      answer:
        "DEFAULT: We offer 10-yard, 20-yard, 30-yard, and 40-yard dumpsters for all types of cleanups—from garage purges to construction projects.",
    },
    {
      FAQ: "DEFAULT: Can I get same-day dumpster rental in [location]?",
      Answer:
        "DEFAULT: Yes. We offer same-day or next-day delivery depending on availability. Just give us a quick call to schedule.",
      question: "DEFAULT: Can I get same-day dumpster rental in [location]?",
      answer:
        "DEFAULT: Yes. We offer same-day or next-day delivery depending on availability. Just give us a quick call to schedule.",
    },
  ];

  if (!Array.isArray(faqSection) || faqSection.length === 0) {
    return defaultFaq;
  }

  return faqSection.map((item: any, index: number) => ({
    FAQ: getValueOrDefault(
      item?.FAQ || item?.question,
      defaultFaq[index]?.FAQ || "DEFAULT: Dumpster Rental Question",
    ),
    Answer: getValueOrDefault(
      item?.Answer || item?.answer,
      defaultFaq[index]?.Answer ||
        "DEFAULT: Professional dumpster rental answer for [location].",
    ),
    question: getValueOrDefault(
      item?.question || item?.FAQ,
      defaultFaq[index]?.question || "DEFAULT: Dumpster Rental Question",
    ),
    answer: getValueOrDefault(
      item?.answer || item?.Answer,
      defaultFaq[index]?.answer ||
        "DEFAULT: Professional dumpster rental answer for [location].",
    ),
  }));
}

// DEFAULT: Helper function to ensure reviews array has complete data with fallbacks
function ensureReviewsSection(reviewsSection: any[]): any[] {
  const defaultReviews = [
    {
      name: "DEFAULT: John D.",
      rating: 5,
      review:
        "DEFAULT: Excellent service! Fast delivery and pickup. Highly recommended!",
      Review:
        "DEFAULT: Excellent service! Fast delivery and pickup. Highly recommended!",
    },
    {
      name: "DEFAULT: Sarah M.",
      rating: 5,
      review:
        "DEFAULT: Professional and reliable. Great pricing and customer service.",
      Review:
        "DEFAULT: Professional and reliable. Great pricing and customer service.",
    },
    {
      name: "DEFAULT: Mike R.",
      rating: 5,
      review:
        "DEFAULT: Fast response time and helpful team. Made our cleanup project easy.",
      Review:
        "DEFAULT: Fast response time and helpful team. Made our cleanup project easy.",
    },
  ];

  if (!Array.isArray(reviewsSection) || reviewsSection.length === 0) {
    return defaultReviews;
  }

  return reviewsSection.map((item: any, index: number) => ({
    name: getValueOrDefault(
      item?.name,
      defaultReviews[index]?.name || "DEFAULT: Satisfied Customer",
    ),
    rating: getValueOrDefault(item?.rating, defaultReviews[index]?.rating || 5),
    review: getValueOrDefault(
      item?.review || item?.Review,
      defaultReviews[index]?.review ||
        "DEFAULT: Great dumpster rental service in [location]!",
    ),
    Review: getValueOrDefault(
      item?.Review || item?.review,
      defaultReviews[index]?.Review ||
        "DEFAULT: Great dumpster rental service in [location]!",
    ),
  }));
}

// DEFAULT: Helper function to ensure types data lists have complete data with comprehensive fallbacks for all typesPage.json fields
function ensureTypesDataLists(serviceData: any): any {
  const defaultTypesData = {
    title: "DEFAULT: Find Your Perfect Dumpster Size",
    p: "DEFAULT: We offer various dumpster sizes to accommodate projects of all scales in [location]. From small home cleanouts to large construction jobs.",
    lists: [
      {
        title: "DEFAULT: 10-Yard Dumpster in [location]",
        shortDescription:
          "DEFAULT: A compact dumpster ideal for small cleanouts, yard waste, and light demolition projects.",
        description:
          "DEFAULT: <ul><li><p><strong>Capacity</strong>: 10 cubic yards</p></li><li><p><strong>Benefits</strong>:</p><ul class='list-disc pl-4'><li><p>Easy to place in tight spaces</p></li><li><p>Ideal for small home cleanouts, yard waste, and light demolition</p></li><li><p>Cost-effective for small projects</p></li></ul></li></ul>",
        h2: "DEFAULT: What Is a 10-Yard Dumpster in [location]",
        p2: "DEFAULT: Planning a small project? Our 10-yard dumpsters are perfect for small residential projects in [location]. These compact units fit easily in driveways and are ideal for home cleanouts.",
        h2Image:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        tyesHeading:
          "DEFAULT: When Do You Need a 10-Yard Dumpster in [location]?",
        slug: "DEFAULT: 10-yard-dumpster",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        overViewHeading: "DEFAULT: Overview Of 10 Yard Dumpster",
        overViewContent:
          "DEFAULT: <ul><li><p><strong>Not Accepted</strong>:</p><ul class='list-disc pl-4'><li><p>Heavy materials</p></li><li><p>Construction and demolition debris</p></li><li><p>Contact us with questions or unusual roofing debris.</p></li></ul></li></ul><div class='mb-2 font-semibold'>What's Included:</div><ul class='list-disc pl-4 mb-4'><li><p>Delivery and pickup</p></li><li><p>Convenient scheduling and account management</p></li></ul><div class='mb-2 font-semibold'>Container Dimensions:</div><div class='mb-2'>12' L x 8' W x 3.5' H</div><div class='text-sm text-gray-500'>Holds: 4 Truckloads</div>",
        overViewImage:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        leftSection: {
          title: "DEFAULT: 10 YARD DUMPSTERS",
          description:
            "DEFAULT: Small jobs: garage clean-outs, small renovations, yard cleanup",
        },
        rightSection: {
          title: "DEFAULT: How to Select the Right Size Dumpster",
          description:
            "DEFAULT: A roll-off dumpster can handle projects of all sizes. Use our guide to select the right dumpster for your area.",
        },
        comapreHeading: "DEFAULT: What Can Go in a 10-Yard Dumpster?",
        allowedHeading: "DEFAULT: Allowed",
        allowedItems: [
          "DEFAULT: Wood, drywall, tile, and small fixtures",
          "DEFAULT: Yard waste (leaves, branches, sod)",
          "DEFAULT: Roofing materials",
          "DEFAULT: Furniture and light appliances",
          "DEFAULT: Household junk and trash",
        ],
        prohibitedHeading: "DEFAULT: Not Allowed",
        prohibitedItems: [
          "DEFAULT: Hazardous materials (paint, asbestos, batteries)",
          "DEFAULT: Tires or electronics (in most areas)",
          "DEFAULT: Large appliances with freon",
          "DEFAULT: Heavy concrete loads (unless pre-approved)",
        ],
        idealHeading: "DEFAULT: Ideal Projects for a 10-Yard Dumpster:",
        idealImage:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        idealProjects: [
          "DEFAULT: Small home renovation projects",
          "DEFAULT: Garage or attic cleanouts",
          "DEFAULT: Yard cleanup and landscaping",
          "DEFAULT: Spring cleaning efforts",
          "DEFAULT: Roofing debris removal",
        ],
      },
    ],
  };

  if (!serviceData || typeof serviceData !== "object") {
    return defaultTypesData;
  }

  const ensuredLists =
    Array.isArray(serviceData.lists) && serviceData.lists.length > 0
      ? serviceData.lists.map((item: any, index: number) => {
          const typedItem = item as any; // Handle inconsistent data structure
          return {
            title: getValueOrDefault(
              typedItem?.title,
              defaultTypesData.lists[index]?.title || "DEFAULT: Dumpster Size",
            ),
            shortDescription: getValueOrDefault(
              typedItem?.shortDescription,
              defaultTypesData.lists[index]?.shortDescription ||
                "DEFAULT: A versatile dumpster for various projects.",
            ),
            description: getValueOrDefault(
              typedItem?.description,
              defaultTypesData.lists[index]?.description ||
                "DEFAULT: Perfect for various projects and cleanouts.",
            ),
            h2: getValueOrDefault(
              typedItem?.h2,
              defaultTypesData.lists[index]?.h2 ||
                "DEFAULT: What Is This Dumpster?",
            ),
            p2: getValueOrDefault(
              typedItem?.p2,
              defaultTypesData.lists[index]?.p2 ||
                "DEFAULT: Our dumpsters are perfect for projects in [location].",
            ),
            h2Image: getValueOrDefault(
              typedItem?.h2Image,
              defaultTypesData.lists[index]?.h2Image ||
                "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
            ),
            tyesHeading: getValueOrDefault(
              typedItem?.tyesHeading,
              defaultTypesData.lists[index]?.tyesHeading ||
                "DEFAULT: When Do You Need This Dumpster?",
            ),
            slug: getValueOrDefault(
              typedItem?.slug,
              defaultTypesData.lists[index]?.slug || "default-dumpster",
            ),
            imageUrl: getValueOrDefault(
              typedItem?.imageUrl,
              defaultTypesData.lists[index]?.imageUrl ||
                "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
            ),
            overViewHeading: getValueOrDefault(
              typedItem?.overViewHeading,
              defaultTypesData.lists[index]?.overViewHeading ||
                "DEFAULT: Overview Of This Dumpster",
            ),
            overViewContent: getValueOrDefault(
              typedItem?.overViewContent,
              defaultTypesData.lists[index]?.overViewContent ||
                "DEFAULT: <p>Perfect for various projects and cleanouts.</p>",
            ),
            overViewImage: getValueOrDefault(
              typedItem?.overViewImage,
              defaultTypesData.lists[index]?.overViewImage ||
                "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
            ),
            leftSection: (() => {
              const defaultLeft = {
                title: "DEFAULT: DUMPSTERS",
                description:
                  "DEFAULT: Various jobs: clean-outs, renovations, yard cleanup",
              };

              if (
                !typedItem?.leftSection ||
                typeof typedItem.leftSection !== "object"
              ) {
                return defaultLeft;
              }

              return {
                title: getValueOrDefault(
                  typedItem.leftSection.title,
                  defaultLeft.title,
                ),
                description: getValueOrDefault(
                  typedItem.leftSection.description,
                  defaultLeft.description,
                ),
              };
            })(),
            rightSection: (() => {
              const defaultRight = {
                title: "DEFAULT: How to Select the Right Size Dumpster",
                description:
                  "DEFAULT: A roll-off dumpster can handle projects of all sizes. Use our guide to select the right dumpster for your area.",
              };

              if (
                !typedItem?.rightSection ||
                typeof typedItem.rightSection !== "object"
              ) {
                return defaultRight;
              }

              return {
                title: getValueOrDefault(
                  typedItem.rightSection.title,
                  defaultRight.title,
                ),
                description: getValueOrDefault(
                  typedItem.rightSection.description,
                  defaultRight.description,
                ),
              };
            })(),
            comapreHeading: getValueOrDefault(
              typedItem?.comapreHeading,
              defaultTypesData.lists[index]?.comapreHeading ||
                "DEFAULT: What Can Go in This Dumpster?",
            ),
            allowedHeading: getValueOrDefault(
              typedItem?.allowedHeading,
              defaultTypesData.lists[index]?.allowedHeading ||
                "DEFAULT: Allowed",
            ),
            allowedItems:
              Array.isArray(typedItem?.allowedItems) &&
              typedItem.allowedItems.length > 0
                ? typedItem.allowedItems.map(
                    (allowedItem: any, allowedIndex: number) =>
                      getValueOrDefault(
                        allowedItem,
                        defaultTypesData.lists[index]?.allowedItems?.[
                          allowedIndex
                        ] || "DEFAULT: Various materials",
                      ),
                  )
                : defaultTypesData.lists[index]?.allowedItems || [
                    "DEFAULT: Various materials",
                  ],
            prohibitedHeading: getValueOrDefault(
              typedItem?.prohibitedHeading,
              defaultTypesData.lists[index]?.prohibitedHeading ||
                "DEFAULT: Not Allowed",
            ),
            prohibitedItems:
              Array.isArray(typedItem?.prohibitedItems) &&
              typedItem.prohibitedItems.length > 0
                ? typedItem.prohibitedItems.map(
                    (prohibitedItem: any, prohibitedIndex: number) =>
                      getValueOrDefault(
                        prohibitedItem,
                        defaultTypesData.lists[index]?.prohibitedItems?.[
                          prohibitedIndex
                        ] || "DEFAULT: Hazardous materials",
                      ),
                  )
                : defaultTypesData.lists[index]?.prohibitedItems || [
                    "DEFAULT: Hazardous materials",
                  ],
            idealHeading: getValueOrDefault(
              typedItem?.idealHeading,
              defaultTypesData.lists[index]?.idealHeading ||
                "DEFAULT: Ideal Projects for This Dumpster:",
            ),
            idealImage: getValueOrDefault(
              typedItem?.idealImage,
              defaultTypesData.lists[index]?.idealImage ||
                "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
            ),
            idealProjects:
              Array.isArray(typedItem?.idealProjects) &&
              typedItem.idealProjects.length > 0
                ? typedItem.idealProjects.map(
                    (idealProject: any, idealIndex: number) =>
                      getValueOrDefault(
                        idealProject,
                        defaultTypesData.lists[index]?.idealProjects?.[
                          idealIndex
                        ] || "DEFAULT: Various renovation projects",
                      ),
                  )
                : defaultTypesData.lists[index]?.idealProjects || [
                    "DEFAULT: Various renovation projects",
                  ],
          };
        })
      : defaultTypesData.lists;

  return {
    title: getValueOrDefault(serviceData.title, defaultTypesData.title),
    p: getValueOrDefault(serviceData.p, defaultTypesData.p),
    lists: ensuredLists,
  };
}

// DEFAULT: Helper function to ensure service data lists have complete data with comprehensive fallbacks
function ensureServiceDataLists(serviceData: any): any {
  const defaultServiceData = {
    title: "DEFAULT: Complete Dumpster Rental Solutions",
    p: "",
    lists: [
      {
        title: "DEFAULT: Residential Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. We offer residential dumpster rental in [location] for home cleanouts, remodeling, yard waste, and more.",
        h2: "DEFAULT: Need a Dumpster for Your Home Project?",
        p2: "DEFAULT: Residential dumpster rental in [location] makes it easy to get rid of clutter, renovation debris, and junk without the trips to the dump. Whether you're clearing the garage or remodeling your kitchen, we've got the right size bin for the job. Call Us At [phone]",
        h3: "DEFAULT: Perfect For Everyday Home Cleanup",
        p3: "DEFAULT: Spring cleaning | Garage cleanouts | DIY renovations | Moving day trash | Yard debris | Storm cleanup | Furniture disposal | Basement junk removal",
        seoContent:
          "DEFAULT: <h2>Residential Dumpster Rentals in [location]</h2><p>Our residential dumpster rental service in [location] is designed to keep your home projects organized and stress-free. We deliver driveway-friendly bins with flexible rental periods, perfect for cleanups big and small. Call Us At [phone]</p>",
        slug: "DEFAULT: residential-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Construction Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Dependable construction dumpster rental in [location] for contractors and job sites needing fast debris removal.",
        h2: "DEFAULT: Built for Heavy-Duty Jobs",
        p2: "DEFAULT: Our construction dumpster rental in [location] supports roofing projects, demolitions, remodels, and large-scale debris hauling. With fast drop-offs and pickup scheduling, you stay on track without waste getting in the way. Call Us At [phone]",
        h3: "DEFAULT: Trusted by Local Contractors",
        p3: "DEFAULT: Roofing jobs | Demolition debris | Remodeling waste | Concrete and drywall | Contractor projects | Framing scraps | Window replacements | Flooring tear-outs",
        seoContent:
          "DEFAULT: <h2>Construction Dumpster Rentals in [location]</h2><p>We supply reliable construction dumpster rental in [location] tailored to meet the fast-paced demands of local contractors and crews. From demo days to final cleanup, we've got your waste covered. Call Us At [phone]</p>",
        slug: "DEFAULT: construction-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Commercial Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Commercial dumpster rental in [location] with flexible terms for property managers, retail spaces, and offices.",
        h2: "DEFAULT: Keep Business Moving, Trash-Free",
        p2: "DEFAULT: Our commercial dumpster rental in [location] is ideal for business renovations, property cleanouts, and daily operations that generate extra waste. We provide scalable solutions and dependable service with flexible scheduling. Call Us At [phone]",
        h3: "DEFAULT: Ideal for Business Needs",
        p3: "DEFAULT: Office cleanouts | Retail renovations | Property management | Warehouse trash | Restaurant remodels | Business relocations | Inventory disposal | Commercial events",
        seoContent:
          "DEFAULT: <h2>Commercial Dumpster Rentals in [location]</h2><p>For dependable commercial dumpster rental in [location], businesses trust us for on-time delivery, scalable bin sizes, and flexible pickup schedules. We help keep your workspace clean and efficient. Call Us At [phone]</p>",
        slug: "DEFAULT: commercial-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Roll Off Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Quick and affordable roll off dumpster rental in [location] for residential and commercial projects of all sizes.",
        h2: "DEFAULT: Easy Roll Off Dumpsters Delivered to You",
        p2: "DEFAULT: We provide roll off dumpster rental in [location] with same-day or next-day delivery. Choose from multiple bin sizes to match your project—no overpaying, no delays. Call Us At [phone]",
        h3: "DEFAULT: Roll Off Dumpsters Work Great For",
        p3: "DEFAULT: Home renovations | Roofing jobs | Office cleanouts | Deck removals | Moving cleanups | Landscaping waste | Construction sites | Bulk trash disposal",
        seoContent:
          "DEFAULT: <h2>Roll Off Dumpster Rental in [location]</h2><p>Our roll off dumpster rental service in [location] is fast, flexible, and built to make cleanup easy. With driveway-safe placement and responsive pickup, your job stays clean and on track. Call Us At [phone]</p>",
        slug: "DEFAULT: roll-off-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Same Day Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Get same day dumpster rental in [location] when you're on a tight deadline or last-minute project needs fast cleanup.",
        h2: "DEFAULT: Need a Dumpster Fast? We've Got You",
        p2: "DEFAULT: When time's tight, we're the go-to for same day dumpster rental in [location]. Call in the morning, get your dumpster delivered that afternoon—no stress, no wait. Call Us At [phone]",
        h3: "DEFAULT: Perfect for Urgent Situations",
        p3: "DEFAULT: Last-minute renovations | Emergency cleanouts | Contractor delays | Weekend projects | DIY demo jobs | Tenant move-outs | Cleanup deadlines | Real estate flips",
        seoContent:
          "DEFAULT: <h2>Same Day Dumpster Rental in [location]</h2><p>Our same day dumpster rental in [location] helps you keep projects moving fast. With responsive service and real-time availability, you get the bin you need without missing a beat. Call Us At [phone]</p>",
        slug: "DEFAULT: same-day-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Yard Waste Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Affordable yard waste dumpster rental in [location] for landscaping projects, tree removal, and outdoor cleanups.",
        h2: "DEFAULT: Tackling Yard Work? Let Us Handle the Haul",
        p2: "DEFAULT: Our yard waste dumpster rental in [location] makes clearing branches, dirt, sod, and clippings easy. Keep your lawn project tidy and dump-free. Call Us At [phone]",
        h3: "DEFAULT: Great For All Types of Yard Debris",
        p3: "DEFAULT: Tree limbs | Bush trimmings | Grass clippings | Dirt and sod | Landscaping scraps | Garden cleanups | Storm debris | Backyard renovations",
        seoContent:
          "DEFAULT: <h2>Yard Waste Dumpster Rental in [location]</h2><p>Clean up your yard the smart way with yard waste dumpster rental in [location]. We deliver right to your property and haul it away when you're done. Call Us At [phone]</p>",
        slug: "DEFAULT: yard-waste-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
    ],
  };

  if (!serviceData || typeof serviceData !== "object") {
    return defaultServiceData;
  }

  const ensuredLists =
    Array.isArray(serviceData.lists) && serviceData.lists.length > 0
      ? serviceData.lists.map((item: any, index: number) => ({
          title: getValueOrDefault(
            item?.title,
            defaultServiceData.lists[index]?.title ||
              "DEFAULT: Dumpster Rental Service",
          ),
          description: getValueOrDefault(
            item?.description,
            defaultServiceData.lists[index]?.description ||
              "DEFAULT: Professional dumpster rental service in [location].",
          ),
          h2: getValueOrDefault(
            item?.h2,
            defaultServiceData.lists[index]?.h2 ||
              "DEFAULT: Professional Service",
          ),
          p2: getValueOrDefault(
            item?.p2,
            defaultServiceData.lists[index]?.p2 ||
              "DEFAULT: Quality dumpster rental service in [location].",
          ),
          h3: getValueOrDefault(
            item?.h3,
            defaultServiceData.lists[index]?.h3 || "DEFAULT: Service Benefits",
          ),
          p3: getValueOrDefault(
            item?.p3,
            defaultServiceData.lists[index]?.p3 ||
              "DEFAULT: Professional solutions for all your needs.",
          ),
          seoContent: getValueOrDefault(
            item?.seoContent,
            defaultServiceData.lists[index]?.seoContent ||
              "DEFAULT: <h2>Professional Dumpster Rental Service</h2><p>Quality service in [location].</p>",
          ),
          slug: getValueOrDefault(
            item?.slug,
            defaultServiceData.lists[index]?.slug || "default-service",
          ),
          imageUrl: getValueOrDefault(
            item?.imageUrl,
            defaultServiceData.lists[index]?.imageUrl ||
              "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
          ),
        }))
      : defaultServiceData.lists;

  return {
    title: getValueOrDefault(serviceData.title, defaultServiceData.title),
    p: getValueOrDefault(serviceData.p, defaultServiceData.p),
    lists: ensuredLists,
  };
}

// DEFAULT: Contact Content with comprehensive default fallbacks
const {
  No = "DEFAULT: (555) 123-4567",
  tel = "DEFAULT: +15551234567",
  mail = "DEFAULT: info@dumpsterrental.com",
  baseUrl = "DEFAULT: https://dumpsterrental.com/",
  host = "DEFAULT: dumpsterrental.com",
  name = "DEFAULT: Premier Dumpster Rental",
  address = "DEFAULT: 123 Main Street, Your City, State 12345",
  service = "DEFAULT: Dumpster Rental",
  location = "DEFAULT: Your City, State",
  zipCode = "DEFAULT: 12345",
  bannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  logoImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  favicon = "DEFAULT: /favicon.ico",
  googleAnalytics = "DEFAULT: GA_MEASUREMENT_ID",
  minor = "DEFAULT: #fed700",
  main = "DEFAULT: #283143",
} = (contactDataJson as any) || {};

const contactContent: any = {
  No: getValueOrDefault(contactDataJson?.No, "DEFAULT: (555) 123-4567"),
  tel: getValueOrDefault(contactDataJson?.tel, "DEFAULT: +15551234567"),
  mail: getValueOrDefault(
    contactDataJson?.mail,
    "",
  ),
  baseUrl: getValueOrDefault(
    contactDataJson?.baseUrl,
    "DEFAULT: https://dumpsterrental.com/",
  ),
  host: getValueOrDefault(contactDataJson?.host, "DEFAULT: dumpsterrental.com"),
  name: getValueOrDefault(
    contactDataJson?.name,
    "DEFAULT: Premier Dumpster Rental",
  ),
  address: getValueOrDefault(
    contactDataJson?.address,
    "",
  ),
  service: getValueOrDefault(
    contactDataJson?.service,
    "DEFAULT: Dumpster Rental",
  ),
  location: getValueOrDefault(
    contactDataJson?.location,
    "DEFAULT: Your City, State",
  ),
  zipCode: getValueOrDefault(contactDataJson?.zipCode, "DEFAULT: 12345"),
  bannerImage: getValueOrDefault(
    contactDataJson?.bannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  logoImage: getValueOrDefault(
    contactDataJson?.logoImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  favicon: getValueOrDefault(contactDataJson?.favicon, "DEFAULT: /favicon.ico"),
  googleAnalytics: getValueOrDefault(
    contactDataJson?.googleAnalytics,
    "DEFAULT: GA_MEASUREMENT_ID",
  ),
  minor: getValueOrDefault(contactDataJson?.minor, "DEFAULT: #fed700"),
  main: getValueOrDefault(contactDataJson?.main, "DEFAULT: #283143"),
};

// DEFAULT: About Content with comprehensive enhanced default fallbacks
const {
  metaTitle,
  metaDescription,
  bannerQuote,
  bannerImage: aboutBannerImage,
  h1Banner,
  p1Banner,
  p2,
  h2Image,
  missionSection,
  areaweserveSection,
} = aboutData || {};

const aboutContent: any = {
  metaTitle: getValueOrDefault(
    metaTitle,
    "DEFAULT: Affordable Dumpster Rental in [location] | About Us",
  ),
  metaDescription: getValueOrDefault(
    metaDescription,
    "DEFAULT: Need affordable dumpster rental in [location]? Fast drop-offs, clear pricing, and easy cleanup. Call Us at [phone] to schedule your roll off dumpster.",
  ),
  bannerQuote: getValueOrDefault(
    bannerQuote,
    "DEFAULT: Your Trusted Partner for Waste Management Solutions",
  ),
  bannerImage: getValueOrDefault(
    aboutBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    h1Banner,
    "DEFAULT: Reliable Dumpster Rental in [location] for Homes & Projects",
  ),
  p1Banner: getValueOrDefault(
    p1Banner,
    "DEFAULT: Need affordable dumpster rental in [location]? Fast drop-offs, clear pricing, and easy cleanup. Call Us at [phone] to schedule your roll off dumpster.",
  ),
  p2: getValueOrDefault(
    p2,
    "DEFAULT: We provide affordable dumpster rental in [location] for homeowners, businesses, real estate professionals, and contractors. Whether you're managing a renovation, clearing out an estate, or handling a construction site, our roll off dumpsters are ready to simplify your cleanup. From 10-yard to 40-yard bins, we deliver the right size dumpster based on your project needs. With flexible rental periods, same-day or next-day delivery, and no hidden fees, our service is trusted by customers who need fast and stress-free solutions.",
  ),
  h2Image: getValueOrDefault(
    h2Image,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  missionSection: ensureMissionSection(missionSection),
  areaweserveSection: (() => {
    const defaultAreaSection = {
      description:
        "DEFAULT: We proudly provide dumpster rental services across [location], delivering to homes, construction sites, offices, and retail locations.",
      linkText: "DEFAULT: Check our Dumpster Rental service locations here.",
      link: "DEFAULT: /locations",
    };

    if (!areaweserveSection || typeof areaweserveSection !== "object") {
      return defaultAreaSection;
    }

    return {
      description: getValueOrDefault(
        areaweserveSection.description,
        defaultAreaSection.description,
      ),
      linkText: getValueOrDefault(
        areaweserveSection.linkText,
        defaultAreaSection.linkText,
      ),
      link: getValueOrDefault(areaweserveSection.link, defaultAreaSection.link),
    };
  })(),
};



// DEFAULT: Contact Page Content with comprehensive default fallbacks
const {
  metaTitle:
    contactPageMetaTitle = "DEFAULT: Contact Us - [location] Dumpster Rental | Get Your Quote Today",
  metaDescription:
    contactPageMetaDescription = "DEFAULT: Contact our [location] dumpster rental team for fast, reliable service. Call [phone] or fill out our form for instant quotes and same-day delivery.",
  bannerQuote:
    contactPageBannerQuote = "DEFAULT: Ready to Get Started? Contact Us Today!",
  bannerImage:
    contactPageBannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h1Banner:
    contactPageH1Banner = "DEFAULT: Contact Our [location] Dumpster Rental Team",
  p1Banner:
    contactPageP1Banner = "DEFAULT: Get in touch with our experienced team for fast, reliable dumpster rental service in [location]. Call [phone] for instant quotes and same-day delivery.",
  h2 = "DEFAULT: Get Your Free Quote Today",
  h2Image:
    contacth2Image = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  p2: contactp2 = "DEFAULT: Our team is ready to help you find the perfect dumpster size for your project. Whether it's a home renovation, construction job, or cleanup project, we have the right solution for you in [location].",
  h3 = "DEFAULT: Why Choose Our Dumpster Rental Service?",
  p3 = "DEFAULT: Fast delivery, competitive pricing, and excellent customer service make us the top choice for dumpster rental in [location]. Call [phone] to experience the difference.",
  h3Image = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ctaText = "DEFAULT: Ready to get started? Call [phone] now for fast, reliable dumpster rental service in [location]!",
  mapLink = "https://maps.google.com/maps?q=[location]&t=&z=10&ie=UTF8&iwloc=&output=embed",
} = (contactPageDataJson as any) || {};

const contactPageContent: any = {
  metaTitle: getValueOrDefault(
    contactPageMetaTitle,
    "DEFAULT: Contact Us - [location] Dumpster Rental | Get Your Quote Today",
  ),
  metaDescription: getValueOrDefault(
    contactPageMetaDescription,
    "DEFAULT: Contact our [location] dumpster rental team for fast, reliable service. Call [phone] or fill out our form for instant quotes and same-day delivery.",
  ),
  bannerQuote: getValueOrDefault(
    contactPageBannerQuote,
    "DEFAULT: Ready to Get Started? Contact Us Today!",
  ),
  bannerImage: getValueOrDefault(
    contactPageBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    contactPageH1Banner,
    "DEFAULT: Contact Our [location] Dumpster Rental Team",
  ),
  p1Banner: getValueOrDefault(
    contactPageP1Banner,
    "DEFAULT: Get in touch with our experienced team for fast, reliable dumpster rental service in [location]. Call [phone] for instant quotes and same-day delivery.",
  ),
  h2: getValueOrDefault(h2, "DEFAULT: Get Your Free Quote Today"),
  h2Image: getValueOrDefault(
    contacth2Image,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  p2: getValueOrDefault(
    contactp2,
    "DEFAULT: Our team is ready to help you find the perfect dumpster size for your project. Whether it's a home renovation, construction job, or cleanup project, we have the right solution for you in [location].",
  ),
  h3: getValueOrDefault(h3, "DEFAULT: Why Choose Our Dumpster Rental Service?"),
  p3: getValueOrDefault(
    p3,
    "DEFAULT: Fast delivery, competitive pricing, and excellent customer service make us the top choice for dumpster rental in [location]. Call [phone] to experience the difference.",
  ),
  h3Image: getValueOrDefault(
    h3Image,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  ctaText: getValueOrDefault(
    ctaText,
    "DEFAULT: Ready to get started? Call [phone] now for fast, reliable dumpster rental service in [location]!",
  ),
  mapLink: getValueOrDefault(
    mapLink,
    "https://maps.google.com/maps?q=[location]&t=&z=10&ie=UTF8&iwloc=&output=embed",
  ),
};

// DEFAULT: Home Content with comprehensive enhanced default fallbacks
const {
  metaTitle:
    homeMetaTitle = "DEFAULT: #1 Dumpster Rental in [location] | Fast Delivery & Fair Prices",
  metaDescription:
    homeMetaDescription = "DEFAULT: Top-rated dumpster rental service in [location]. Fast delivery, competitive prices, and reliable service. Call [phone] for your free quote today!",
  bannerQuote: homeBannerQuote = "DEFAULT: Fast, Reliable, Affordable",
  bannerImage:
    homeBannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h1Banner: homeH1Banner = "DEFAULT: #1 Dumpster Rental Service in [location]",
  p1Banner:
    homeP1Banner = "DEFAULT: Get fast, reliable dumpster rental service in [location]. Same-day delivery available. Call [phone] for your free quote!",
  h2: homeh2 = "DEFAULT: Why Choose Our Dumpster Rental Service?",
  p2: homep2 = "DEFAULT: We provide the fastest, most reliable dumpster rental service in [location] with competitive pricing and exceptional customer service.",
  h2Image:
    homeh2Image = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h3: homeh3 = "DEFAULT: Professional Dumpster Rental Solutions",
  p3: homep3 = "DEFAULT: From residential cleanouts to commercial construction projects, we have the right dumpster size for your needs in [location].",
  h3Image:
    homeh3Image = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  mapLink:
    homemapLink = " https://maps.google.com/maps?q=[location]&t=&z=10&ie=UTF8&iwloc=&output=embed",
  faq = [
    {
      FAQ: "DEFAULT: What sizes of dumpsters do you offer?",
      Answer:
        "DEFAULT: We offer 10, 15, 20, 30, and 40-yard dumpsters to meet all your project needs.",
      question: "DEFAULT: What sizes of dumpsters do you offer?",
      answer:
        "DEFAULT: We offer 10, 15, 20, 30, and 40-yard dumpsters to meet all your project needs.",
    },
    {
      FAQ: "DEFAULT: How quickly can you deliver?",
      Answer:
        "DEFAULT: We offer same-day and next-day delivery in [location] for your convenience.",
      question: "DEFAULT: How quickly can you deliver?",
      answer:
        "DEFAULT: We offer same-day and next-day delivery in [location] for your convenience.",
    },
  ],
  reviews = [
    {
      name: "DEFAULT: John D.",
      rating: 5,
      review:
        "DEFAULT: Excellent service! Fast delivery and pickup. Highly recommended!",
      Review:
        "DEFAULT: Excellent service! Fast delivery and pickup. Highly recommended!",
    },
    {
      name: "DEFAULT: Sarah M.",
      rating: 5,
      review:
        "DEFAULT: Professional and reliable. Great pricing and customer service.",
      Review:
        "DEFAULT: Professional and reliable. Great pricing and customer service.",
    },
  ],
  whyChooseSection = {
    title: "DEFAULT: Why Choose Our Dumpster Rental Service?",
    whyChooseData: [
      {
        title: "DEFAULT: Fast Delivery",
        description: "DEFAULT: Same-day and next-day delivery available",
        imageUrl: "DEFAULT: Comprehensive-Services.svg",
      },
      {
        title: "DEFAULT: Competitive Pricing",
        description: "DEFAULT: Best rates in [location] with no hidden fees",
        imageUrl: "DEFAULT: Transparent-Pricing.png",
      },
      {
        title: "DEFAULT: Professional Service",
        description:
          "DEFAULT: Experienced team with excellent customer service",
        imageUrl: "DEFAULT: Expert-Team.png",
      },
    ],
  },
  affordableWidget = {
    title: "DEFAULT: Affordable Dumpster Rental Solutions",
    description:
      "DEFAULT: Get the best prices on dumpster rentals in [location] with transparent pricing and no hidden fees.",
    ctaText: "DEFAULT: Get Your Free Quote",
    cards: [
      {
        title: "DEFAULT: Residential Projects",
        description: "DEFAULT: Perfect for home cleanouts and renovations",
        price: "DEFAULT: Starting at $299",
      },
      {
        title: "DEFAULT: Commercial Projects",
        description: "DEFAULT: Ideal for construction and business needs",
        price: "DEFAULT: Starting at $399",
      },
    ],
  },
  processWidget = {
    title: "DEFAULT: Simple 3-Step Process",
    description:
      "",
    steps: [
      {
        step: "DEFAULT: 1",
        title: "DEFAULT: Call or Book Online",
        description: "DEFAULT: Contact us at [phone] or book online",
      },
      {
        step: "DEFAULT: 2",
        title: "DEFAULT: We Deliver",
        description: "DEFAULT: Fast delivery to your location in [location]",
      },
      {
        step: "DEFAULT: 3",
        title: "DEFAULT: We Pick Up",
        description: "DEFAULT: We handle pickup and disposal for you",
      },
    ],
  },
  hourCtaWidget = {
    title: "DEFAULT: 24-Hour Dumpster Rental Service Available",
  },
} = (homePageDataJson as any) || {};

const homePageContent: any = {
  metaTitle: getValueOrDefault(
    homeMetaTitle,
    "DEFAULT: #1 Dumpster Rental in [location] | Fast Delivery & Fair Prices",
  ),
  metaDescription: getValueOrDefault(
    homeMetaDescription,
    "DEFAULT: Top-rated dumpster rental service in [location]. Fast delivery, competitive prices, and reliable service. Call [phone] for your free quote today!",
  ),
  bannerQuote: getValueOrDefault(
    homeBannerQuote,
    "DEFAULT: Fast, Reliable, Affordable",
  ),
  bannerImage: getValueOrDefault(
    homeBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    homeH1Banner,
    "DEFAULT: #1 Dumpster Rental Service in [location]",
  ),
  p1Banner: getValueOrDefault(
    homeP1Banner,
    "DEFAULT: Get fast, reliable dumpster rental service in [location]. Same-day delivery available. Call [phone] for your free quote!",
  ),
  h2: getValueOrDefault(
    homeh2,
    "DEFAULT: Why Choose Our Dumpster Rental Service?",
  ),
  p2: getValueOrDefault(
    homep2,
    "DEFAULT: We provide the fastest, most reliable dumpster rental service in [location] with competitive pricing and exceptional customer service.",
  ),
  h2Image: getValueOrDefault(
    homeh2Image,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h3: getValueOrDefault(
    homeh3,
    "DEFAULT: Professional Dumpster Rental Solutions",
  ),
  p3: getValueOrDefault(
    homep3,
    "DEFAULT: From residential cleanouts to commercial construction projects, we have the right dumpster size for your needs in [location].",
  ),
  h3Image: getValueOrDefault(
    homeh3Image,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  mapLink: getValueOrDefault(
    homemapLink,
    "https://maps.google.com/maps?q=[location]&t=&z=10&ie=UTF8&iwloc=&output=embed",
  ),
  faq: ensureFaqSection(faq),
  reviews: ensureReviewsSection(reviews),
  whyChooseSection: (() => {
    const defaultWhyChoose = {
      title: "DEFAULT: Why Choose Our Dumpster Rental Service?",
      whyChooseData: [
        {
          title: "DEFAULT: Fast Delivery",
          description: "DEFAULT: Same-day and next-day delivery available",
          imageUrl: "DEFAULT: Comprehensive-Services.svg",
        },
        {
          title: "DEFAULT: Competitive Pricing",
          description: "DEFAULT: Best rates in [location] with no hidden fees",
          imageUrl: "DEFAULT: Transparent-Pricing.png",
        },
        {
          title: "DEFAULT: Professional Service",
          description:
            "DEFAULT: Experienced team with excellent customer service",
          imageUrl: "DEFAULT: Expert-Team.png",
        },
      ],
    };

    if (!whyChooseSection || typeof whyChooseSection !== "object") {
      return defaultWhyChoose;
    }

    const ensuredWhyChooseData =
      Array.isArray(whyChooseSection.whyChooseData) &&
      whyChooseSection.whyChooseData.length > 0
        ? whyChooseSection.whyChooseData.map((item: any, index: number) => ({
            title: getValueOrDefault(
              item?.title,
              defaultWhyChoose.whyChooseData[index]?.title ||
                "DEFAULT: Service Feature",
            ),
            description: getValueOrDefault(
              item?.description,
              defaultWhyChoose.whyChooseData[index]?.description ||
                "DEFAULT: Quality service description",
            ),
            imageUrl: getValueOrDefault(
              item?.imageUrl,
              defaultWhyChoose.whyChooseData[index]?.imageUrl ||
                "DEFAULT: service-icon.svg",
            ),
          }))
        : defaultWhyChoose.whyChooseData;

    return {
      title: getValueOrDefault(whyChooseSection.title, defaultWhyChoose.title),
      whyChooseData: ensuredWhyChooseData,
    };
  })(),
  affordableWidget: (() => {
    const defaultAffordable = {
      title: "DEFAULT: Affordable Dumpster Rental Solutions",
      description:
        "DEFAULT: Get the best prices on dumpster rentals in [location] with transparent pricing and no hidden fees.",
      ctaText: "DEFAULT: Get Your Free Quote",
      cards: [
        {
          title: "DEFAULT: Residential Projects",
          description: "DEFAULT: Perfect for home cleanouts and renovations",
          price: "DEFAULT: Starting at $299",
        },
        {
          title: "DEFAULT: Commercial Projects",
          description: "DEFAULT: Ideal for construction and business needs",
          price: "DEFAULT: Starting at $399",
        },
      ],
    };

    if (!affordableWidget || typeof affordableWidget !== "object") {
      return defaultAffordable;
    }

    const ensuredCards =
      Array.isArray(affordableWidget.cards) && affordableWidget.cards.length > 0
        ? affordableWidget.cards.map((card: any, index: number) => ({
            title: getValueOrDefault(
              card?.title,
              defaultAffordable.cards[index]?.title ||
                "DEFAULT: Service Package",
            ),
            description: getValueOrDefault(
              card?.description,
              defaultAffordable.cards[index]?.description ||
                "DEFAULT: Service description",
            ),
            price: getValueOrDefault(
              card?.price,
              defaultAffordable.cards[index]?.price ||
                "DEFAULT: Contact for pricing",
            ),
          }))
        : defaultAffordable.cards;

    return {
      title: getValueOrDefault(affordableWidget.title, defaultAffordable.title),
      description: getValueOrDefault(
        affordableWidget.description,
        defaultAffordable.description,
      ),
      ctaText: getValueOrDefault(
        affordableWidget.ctaText,
        defaultAffordable.ctaText,
      ),
      cards: ensuredCards,
    };
  })(),
  processWidget: (() => {
    const defaultProcess = {
      title: "DEFAULT: Simple 3-Step Process",
      description:
        "",
      steps: [
        {
          step: "DEFAULT: 1",
          title: "DEFAULT: Call or Book Online",
          description: "DEFAULT: Contact us at [phone] or book online",
        },
        {
          step: "DEFAULT: 2",
          title: "DEFAULT: We Deliver",
          description: "DEFAULT: Fast delivery to your location in [location]",
        },
        {
          step: "DEFAULT: 3",
          title: "DEFAULT: We Pick Up",
          description: "DEFAULT: We handle pickup and disposal for you",
        },
      ],
    };

    if (!processWidget || typeof processWidget !== "object") {
      return defaultProcess;
    }

    const ensuredSteps =
      Array.isArray(processWidget.steps) && processWidget.steps.length > 0
        ? processWidget.steps.map((step: any, index: number) => ({
            step: getValueOrDefault(
              step?.step,
              defaultProcess.steps[index]?.step || `DEFAULT: ${index + 1}`,
            ),
            title: getValueOrDefault(
              step?.title,
              defaultProcess.steps[index]?.title || "DEFAULT: Process Step",
            ),
            description: getValueOrDefault(
              step?.description,
              defaultProcess.steps[index]?.description ||
                "DEFAULT: Step description",
            ),
          }))
        : defaultProcess.steps;

    return {
      title: getValueOrDefault(processWidget.title, defaultProcess.title),
      description: getValueOrDefault(
        processWidget.description,
        defaultProcess.description,
      ),
      steps: ensuredSteps,
    };
  })(),
  hourCtaWidget: (() => {
    const defaultHourCta = {
      title: "DEFAULT: 24-Hour Dumpster Rental Service Available",
    };

    if (!hourCtaWidget || typeof hourCtaWidget !== "object") {
      return defaultHourCta;
    }

    return {
      title: getValueOrDefault(hourCtaWidget.title, defaultHourCta.title),
    };
  })(),
};

// DEFAULT: Location Page Content with comprehensive default fallbacks
const {
  metaTitle:
    locationMetaTitle = "DEFAULT: Dumpster Rental Service Areas | [location] and Surrounding Areas",
  metaDescription:
    locationMetaDescription = "DEFAULT: We provide dumpster rental services throughout [location] and surrounding areas. Find your location and get fast, reliable service today.",
  bannerQuote:
    locationBannerQuote = "DEFAULT: Serving [location] and Surrounding Areas",
  bannerImage:
    locationBannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h1Banner:
    locationH1Banner = "DEFAULT: Dumpster Rental Service Areas in [location]",
  p1Banner:
    locationP1Banner = "DEFAULT: We proudly serve [location] and surrounding areas with fast, reliable dumpster rental services. Find your location below or call [phone] to confirm service availability.",
  blogMetas = {
    metaTitle: "DEFAULT: Local Dumpster Rental Tips and Information",
    metaDescription:
      "DEFAULT: Get helpful tips and information about dumpster rental in your area.",
  },
} = (locationPageDataJson as any) || {};

const locationPageContent: any = {
  metaTitle: getValueOrDefault(
    locationMetaTitle,
    "DEFAULT: Dumpster Rental Service Areas | [location] and Surrounding Areas",
  ),
  metaDescription: getValueOrDefault(
    locationMetaDescription,
    "DEFAULT: We provide dumpster rental services throughout [location] and surrounding areas. Find your location and get fast, reliable service today.",
  ),
  bannerQuote: getValueOrDefault(
    locationBannerQuote,
    "DEFAULT: Serving [location] and Surrounding Areas",
  ),
  bannerImage: getValueOrDefault(
    locationBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    locationH1Banner,
    "DEFAULT: Dumpster Rental Service Areas in [location]",
  ),
  p1Banner: getValueOrDefault(
    locationP1Banner,
    "DEFAULT: We proudly serve [location] and surrounding areas with fast, reliable dumpster rental services. Find your location below or call [phone] to confirm service availability.",
  ),
  blogMetas: (() => {
    const defaultBlogMetas = {
      metaTitle: "DEFAULT: Local Dumpster Rental Tips and Information",
      metaDescription:
        "DEFAULT: Get helpful tips and information about dumpster rental in your area.",
    };

    if (!blogMetas || typeof blogMetas !== "object") {
      return defaultBlogMetas;
    }

    return {
      metaTitle: getValueOrDefault(
        blogMetas.metaTitle,
        defaultBlogMetas.metaTitle,
      ),
      metaDescription: getValueOrDefault(
        blogMetas.metaDescription,
        defaultBlogMetas.metaDescription,
      ),
    };
  })(),
};

// DEFAULT: Brands Content with comprehensive default fallbacks
const {
  metaTitle:
    brandsMetaTitle = "DEFAULT: Our Trusted Dumpster Rental Brands | Quality Equipment & Service",
  metaDescription:
    brandsMetaDescription = "DEFAULT: Learn about our trusted dumpster rental brands and equipment. We use only the highest quality dumpsters for reliable service in [location].",
  bannerImage:
    brandsBannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h1Banner: brandsH1Banner = "DEFAULT: Our Trusted Dumpster Rental Brands",
  h2: brandh2 = "DEFAULT: Quality Equipment You Can Trust",
  p2: brandsP2 = "DEFAULT: We partner with the most reliable brands in the industry to ensure you get quality dumpsters and professional service every time in [location].",
  h2Image:
    brandsh2Image = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  brandslist = [
    {
      name: "DEFAULT: Premium Dumpster Solutions",
      description: "DEFAULT: Industry-leading dumpster rental equipment",
      image:
        "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930+1",
      brandName: "DEFAULT: Premium Dumpster Solutions",
      brandLink: "DEFAULT: #",
      brandDescription:
        "DEFAULT: Industry-leading dumpster rental equipment and professional service",
    },
    {
      name: "DEFAULT: Reliable Waste Management",
      description: "DEFAULT: Trusted waste management solutions",
      image:
        "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930+2",
      brandName: "DEFAULT: Reliable Waste Management",
      brandLink: "DEFAULT: #",
      brandDescription:
        "DEFAULT: Trusted waste management solutions for all your needs",
    },
  ],
} = (brandsDataJson as any) || {};

const brandsContent: any = {
  metaTitle: getValueOrDefault(
    brandsMetaTitle,
    "DEFAULT: Our Trusted Dumpster Rental Brands | Quality Equipment & Service",
  ),
  metaDescription: getValueOrDefault(
    brandsMetaDescription,
    "DEFAULT: Learn about our trusted dumpster rental brands and equipment. We use only the highest quality dumpsters for reliable service in [location].",
  ),
  bannerImage: getValueOrDefault(
    brandsBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    brandsH1Banner,
    "DEFAULT: Our Trusted Dumpster Rental Brands",
  ),
  h2: getValueOrDefault(brandh2, "DEFAULT: Quality Equipment You Can Trust"),
  p2: getValueOrDefault(
    brandsP2,
    "DEFAULT: We partner with the most reliable brands in the industry to ensure you get quality dumpsters and professional service every time in [location].",
  ),
  h2Image: getValueOrDefault(
    brandsh2Image,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  brandslist: (() => {
    const defaultBrandsList = [
      {
        name: "DEFAULT: Premium Dumpster Solutions",
        description: "DEFAULT: Industry-leading dumpster rental equipment",
        image:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        brandName: "DEFAULT: Premium Dumpster Solutions",
        brandLink: "DEFAULT: #",
        brandDescription:
          "DEFAULT: Industry-leading dumpster rental equipment and professional service",
      },
      {
        name: "DEFAULT: Reliable Waste Management",
        description: "DEFAULT: Trusted waste management solutions",
        image:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        brandName: "DEFAULT: Reliable Waste Management",
        brandLink: "DEFAULT: #",
        brandDescription:
          "DEFAULT: Trusted waste management solutions for all your needs",
      },
    ];

    if (!Array.isArray(brandslist) || brandslist.length === 0) {
      return defaultBrandsList;
    }

    return brandslist.map((brand: any, index: number) => ({
      name: getValueOrDefault(
        brand?.name || brand?.brandName,
        defaultBrandsList[index]?.name || "DEFAULT: Trusted Brand",
      ),
      description: getValueOrDefault(
        brand?.description || brand?.brandDescription,
        defaultBrandsList[index]?.description ||
          "DEFAULT: Quality service provider",
      ),
      image: getValueOrDefault(
        brand?.image,
        defaultBrandsList[index]?.image ||
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      ),
      brandName: getValueOrDefault(
        brand?.brandName || brand?.name,
        defaultBrandsList[index]?.brandName || "DEFAULT: Trusted Brand",
      ),
      brandLink: getValueOrDefault(
        brand?.brandLink,
        defaultBrandsList[index]?.brandLink || "DEFAULT: #",
      ),
      brandDescription: getValueOrDefault(
        brand?.brandDescription || brand?.description,
        defaultBrandsList[index]?.brandDescription ||
          "DEFAULT: Quality service provider",
      ),
    }));
  })(),
};

// DEFAULT: Service Page Content with comprehensive default fallbacks
const {
  metaTitle:
    serviceMetaTitle = "DEFAULT: Professional Dumpster Rental Services in [location] | All Project Types",
  metaDescription:
    serviceMetaDescription = "DEFAULT: Complete dumpster rental services in [location]. Residential, commercial, construction, and cleanup projects. Call [phone] for fast service.",
  bannerQuote:
    serviceBannerQuote = "DEFAULT: Professional Dumpster Rental Services",
  bannerImage:
    serviceBannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h1Banner:
    serviceH1Banner = "DEFAULT: Professional Dumpster Rental Services in [location]",
  p1Banner:
    serviceP1Banner = "DEFAULT: We provide comprehensive dumpster rental services for all types of projects in [location]. From residential cleanouts to large construction jobs, we have you covered.",
  serviceTitle = "DEFAULT: Our Dumpster Rental Services",
  serviceData = {
    title: "DEFAULT: Complete Dumpster Rental Solutions",
    p: "DEFAULT: We offer a full range of dumpster rental services to meet all your waste management needs in [location].",
    lists: [
      {
        title: "DEFAULT: Residential Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. We offer residential dumpster rental in [location] for home cleanouts, remodeling, yard waste, and more.",
        h2: "DEFAULT: Need a Dumpster for Your Home Project?",
        p2: "DEFAULT: Residential dumpster rental in [location] makes it easy to get rid of clutter, renovation debris, and junk without the trips to the dump. Whether you're clearing the garage or remodeling your kitchen, we've got the right size bin for the job. Call Us At [phone]",
        h3: "DEFAULT: Perfect For Everyday Home Cleanup",
        p3: "DEFAULT: Spring cleaning | Garage cleanouts | DIY renovations | Moving day trash | Yard debris | Storm cleanup | Furniture disposal | Basement junk removal",
        seoContent:
          "DEFAULT: <h2>Residential Dumpster Rentals in [location]</h2><p>Our residential dumpster rental service in [location] is designed to keep your home projects organized and stress-free. We deliver driveway-friendly bins with flexible rental periods, perfect for cleanups big and small. Call Us At [phone]</p>",
        slug: "DEFAULT: residential-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Construction Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Dependable construction dumpster rental in [location] for contractors and job sites needing fast debris removal.",
        h2: "DEFAULT: Built for Heavy-Duty Jobs",
        p2: "DEFAULT: Our construction dumpster rental in [location] supports roofing projects, demolitions, remodels, and large-scale debris hauling. With fast drop-offs and pickup scheduling, you stay on track without waste getting in the way. Call Us At [phone]",
        h3: "DEFAULT: Trusted by Local Contractors",
        p3: "DEFAULT: Roofing jobs | Demolition debris | Remodeling waste | Concrete and drywall | Contractor projects | Framing scraps | Window replacements | Flooring tear-outs",
        seoContent:
          "DEFAULT: <h2>Construction Dumpster Rentals in [location]</h2><p>We supply reliable construction dumpster rental in [location] tailored to meet the fast-paced demands of local contractors and crews. From demo days to final cleanup, we've got your waste covered. Call Us At [phone]</p>",
        slug: "DEFAULT: construction-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Commercial Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Commercial dumpster rental in [location] with flexible terms for property managers, retail spaces, and offices.",
        h2: "DEFAULT: Keep Business Moving, Trash-Free",
        p2: "DEFAULT: Our commercial dumpster rental in [location] is ideal for business renovations, property cleanouts, and daily operations that generate extra waste. We provide scalable solutions and dependable service with flexible scheduling. Call Us At [phone]",
        h3: "DEFAULT: Ideal for Business Needs",
        p3: "DEFAULT: Office cleanouts | Retail renovations | Property management | Warehouse trash | Restaurant remodels | Business relocations | Inventory disposal | Commercial events",
        seoContent:
          "DEFAULT: <h2>Commercial Dumpster Rentals in [location]</h2><p>For dependable commercial dumpster rental in [location], businesses trust us for on-time delivery, scalable bin sizes, and flexible pickup schedules. We help keep your workspace clean and efficient. Call Us At [phone]</p>",
        slug: "DEFAULT: commercial-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Roll Off Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Quick and affordable roll off dumpster rental in [location] for residential and commercial projects of all sizes.",
        h2: "DEFAULT: Easy Roll Off Dumpsters Delivered to You",
        p2: "DEFAULT: We provide roll off dumpster rental in [location] with same-day or next-day delivery. Choose from multiple bin sizes to match your project—no overpaying, no delays. Call Us At [phone]",
        h3: "DEFAULT: Roll Off Dumpsters Work Great For",
        p3: "DEFAULT: Home renovations | Roofing jobs | Office cleanouts | Deck removals | Moving cleanups | Landscaping waste | Construction sites | Bulk trash disposal",
        seoContent:
          "DEFAULT: <h2>Roll Off Dumpster Rental in [location]</h2><p>Our roll off dumpster rental service in [location] is fast, flexible, and built to make cleanup easy. With driveway-safe placement and responsive pickup, your job stays clean and on track. Call Us At [phone]</p>",
        slug: "DEFAULT: roll-off-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Same Day Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Get same day dumpster rental in [location] when you're on a tight deadline or last-minute project needs fast cleanup.",
        h2: "DEFAULT: Need a Dumpster Fast? We've Got You",
        p2: "DEFAULT: When time's tight, we're the go-to for same day dumpster rental in [location]. Call in the morning, get your dumpster delivered that afternoon—no stress, no wait. Call Us At [phone]",
        h3: "DEFAULT: Perfect for Urgent Situations",
        p3: "DEFAULT: Last-minute renovations | Emergency cleanouts | Contractor delays | Weekend projects | DIY demo jobs | Tenant move-outs | Cleanup deadlines | Real estate flips",
        seoContent:
          "DEFAULT: <h2>Same Day Dumpster Rental in [location]</h2><p>Our same day dumpster rental in [location] helps you keep projects moving fast. With responsive service and real-time availability, you get the bin you need without missing a beat. Call Us At [phone]</p>",
        slug: "DEFAULT: same-day-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
      {
        title: "DEFAULT: Yard Waste Dumpster Rental in [location]",
        description:
          "DEFAULT: Call Us At [phone]. Affordable yard waste dumpster rental in [location] for landscaping projects, tree removal, and outdoor cleanups.",
        h2: "DEFAULT: Tackling Yard Work? Let Us Handle the Haul",
        p2: "DEFAULT: Our yard waste dumpster rental in [location] makes clearing branches, dirt, sod, and clippings easy. Keep your lawn project tidy and dump-free. Call Us At [phone]",
        h3: "DEFAULT: Great For All Types of Yard Debris",
        p3: "DEFAULT: Tree limbs | Bush trimmings | Grass clippings | Dirt and sod | Landscaping scraps | Garden cleanups | Storm debris | Backyard renovations",
        seoContent:
          "DEFAULT: <h2>Yard Waste Dumpster Rental in [location]</h2><p>Clean up your yard the smart way with yard waste dumpster rental in [location]. We deliver right to your property and haul it away when you're done. Call Us At [phone]</p>",
        slug: "DEFAULT: yard-waste-dumpster-rental",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      },
    ],
  },
} = (servicePageDataJson as any) || {};

const servicePageContent: any = {
  metaTitle: getValueOrDefault(
    serviceMetaTitle,
    "DEFAULT: Professional Dumpster Rental Services in [location] | All Project Types",
  ),
  metaDescription: getValueOrDefault(
    serviceMetaDescription,
    "DEFAULT: Complete dumpster rental services in [location]. Residential, commercial, construction, and cleanup projects. Call [phone] for fast service.",
  ),
  bannerQuote: getValueOrDefault(
    serviceBannerQuote,
    "DEFAULT: Professional Dumpster Rental Services",
  ),
  bannerImage: getValueOrDefault(
    serviceBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    serviceH1Banner,
    "DEFAULT: Professional Dumpster Rental Services in [location]",
  ),
  p1Banner: getValueOrDefault(
    serviceP1Banner,
    "DEFAULT: We provide comprehensive dumpster rental services for all types of projects in [location]. From residential cleanouts to large construction jobs, we have you covered.",
  ),
  serviceTitle: getValueOrDefault(
    serviceTitle,
    "DEFAULT: Our Dumpster Rental Services",
  ),
  serviceData: ensureServiceDataLists(serviceData),
};

// DEFAULT: Types Page Content with comprehensive default fallbacks
const {
  metaTitle:
    portableMetaTitle = "DEFAULT: Dumpster Sizes & Types in [location] | Choose the Right Size for Your Project",
  metaDescription:
    portableMetaDescription = "DEFAULT: Find the perfect dumpster size for your project in [location]. 10, 15, 20, 30, and 40-yard dumpsters available. Call [phone] for sizing help.",
  bannerQuote: portableBannerQuote = "DEFAULT: Choose the Right Dumpster Size",
  bannerImage:
    portableBannerImage = "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  h1Banner:
    portableH1Banner = "DEFAULT: Dumpster Sizes & Types Available in [location]",
  p1Banner:
    portableP1Banner = "DEFAULT: Choose from our wide selection of dumpster sizes and types to find the perfect fit for your project in [location]. Our experts can help you select the right size.",
  serviceTitle: portableServiceTitle = "DEFAULT: Available Dumpster Sizes",
  serviceData: typeserviceData = {
    title: "DEFAULT: Find Your Perfect Dumpster Size",
    p: "DEFAULT: We offer various dumpster sizes to accommodate projects of all scales in [location]. From small home cleanouts to large construction jobs.",
    lists: [
      {
        title: "DEFAULT: 10-Yard Dumpster in [location]",
        shortDescription:
          "DEFAULT: A compact dumpster ideal for small cleanouts, yard waste, and light demolition projects.",
        description: "DEFAULT: Perfect for small home projects and cleanouts.",
        h2: "DEFAULT: What Is a 10-Yard Dumpster in [location]",
        p2: "DEFAULT: Our 10-yard dumpsters are perfect for small residential projects in [location].",
        h2Image:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        tyesHeading:
          "DEFAULT: When Do You Need a 10-Yard Dumpster in [location]?",
        slug: "DEFAULT: 10-yard-dumpster",
        imageUrl:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        overViewHeading: "DEFAULT: Overview Of 10 Yard Dumpster",
        overViewContent:
          "DEFAULT: <p>Perfect for small residential projects and cleanouts.</p>",
        overViewImage:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        leftSection: {
          title: "DEFAULT: 10 YARD DUMPSTERS",
          description:
            "DEFAULT: Small jobs: garage clean-outs, small renovations, yard cleanup",
        },
        rightSection: {
          title: "DEFAULT: How to Select the Right Size Dumpster",
          description:
            "DEFAULT: A roll-off dumpster can handle projects of all sizes. Use our guide to select the right dumpster for your area.",
        },
        comapreHeading: "DEFAULT: What Can Go in a 10-Yard Dumpster?",
        allowedHeading: "DEFAULT: Allowed",
        allowedItems: [
          "DEFAULT: Wood, drywall, tile, and small fixtures",
          "DEFAULT: Yard waste (leaves, branches, sod)",
          "DEFAULT: Furniture and light appliances",
          "DEFAULT: Household junk and trash",
        ],
        prohibitedHeading: "DEFAULT: Not Allowed",
        prohibitedItems: [
          "DEFAULT: Hazardous materials (paint, asbestos, batteries)",
          "DEFAULT: Tires or electronics (in most areas)",
          "DEFAULT: Large appliances with freon",
          "DEFAULT: Heavy concrete loads (unless pre-approved)",
        ],
        idealHeading: "DEFAULT: Ideal Projects for a 10-Yard Dumpster:",
        idealImage:
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        idealProjects: [
          "DEFAULT: Small home renovation projects",
          "DEFAULT: Garage or attic cleanouts",
          "DEFAULT: Yard cleanup and landscaping",
          "DEFAULT: Spring cleaning efforts",
        ],
      },
    ],
  },
} = (typesJson as any) || {};

const typesJsonContent: any = {
  metaTitle: getValueOrDefault(
    portableMetaTitle,
    "DEFAULT: Dumpster Sizes & Types in [location] | Choose the Right Size for Your Project",
  ),
  metaDescription: getValueOrDefault(
    portableMetaDescription,
    "DEFAULT: Find the perfect dumpster size for your project in [location]. 10, 15, 20, 30, and 40-yard dumpsters available. Call [phone] for sizing help.",
  ),
  bannerQuote: getValueOrDefault(
    portableBannerQuote,
    "DEFAULT: Choose the Right Dumpster Size",
  ),
  bannerImage: getValueOrDefault(
    portableBannerImage,
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  ),
  h1Banner: getValueOrDefault(
    portableH1Banner,
    "DEFAULT: Dumpster Sizes & Types Available in [location]",
  ),
  p1Banner: getValueOrDefault(
    portableP1Banner,
    "DEFAULT: Choose from our wide selection of dumpster sizes and types to find the perfect fit for your project in [location]. Our experts can help you select the right size.",
  ),
  serviceTitle: getValueOrDefault(
    portableServiceTitle,
    "DEFAULT: Available Dumpster Sizes",
  ),
  serviceData: ensureTypesDataLists(typeserviceData),
};

// DEFAULT: SubDomain URL Content with comprehensive default fallbacks
const subDomainUrlContent: any = (() => {
  const defaultSubDomainContent = {
    "default-location": {
      name: "DEFAULT: Your City",
      publishedAt: "DEFAULT: 2025-01-01",
      slug: "DEFAULT: your-city",
      metaTitle: "DEFAULT: Affordable Dumpster Rental Services in Your City",
      metaDescription:
        "DEFAULT: Looking for reliable dumpster rental in Your City? We offer fast delivery, flexible sizes, and affordable pricing. Call us at [phone]!",
      bannerImage:
        "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      h1Banner: "DEFAULT: Dumpster Rentals in Your City Near You",
      h2: "DEFAULT: Your Trusted Dumpster Rental Partner in Your City",
      p2: "DEFAULT: Whether you're managing a home renovation, clearing out a property, or running a construction site, our dumpster rental service in Your City has the right bin for the job.",
      h2Image:
        "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      serviceTtile: "DEFAULT: Our Dumpster Rental Services",
      needsSection: {
        title: "DEFAULT: Why Choose Us for Dumpster Rental in Your City",
        description: "DEFAULT: Professional service you can trust",
        needslist: [
          {
            title: "DEFAULT: Same-Day Delivery",
            description:
              "DEFAULT: Get your dumpster when you need it. We offer fast delivery so your project doesn't have to wait.",
          },
          {
            title: "DEFAULT: Flat-Rate Pricing",
            description:
              "DEFAULT: No hidden fees. Just straightforward pricing that makes budgeting simple.",
          },
        ],
      },
      processSection: {
        title: "DEFAULT: How Our Dumpster Rental Process Works",
        processData: [
          {
            title: "DEFAULT: Choose Your Dumpster",
            description:
              "DEFAULT: Pick the size that fits your cleanup. Not sure? Our team can help you decide.",
          },
          {
            title: "DEFAULT: Schedule Delivery",
            description:
              "DEFAULT: Tell us when and where. We'll drop the bin off right where you need it.",
          },
        ],
      },
      h5: "DEFAULT: Affordable Dumpster Rentals Company for Every Occasion",
      p5: "DEFAULT: Whether it's a home cleanout or a commercial renovation, our dumpster rentals offer the ideal waste solution.",
      h5Image:
        "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
      faq: [
        {
          ques: "DEFAULT: What size dumpsters do you offer?",
          ans: "DEFAULT: We offer multiple sizes including 10-yard, 15-yard, 20-yard, and 30-yard dumpsters to suit every project.",
        },
      ],
      reviews: [],
      neighbourhoods: "DEFAULT: Local Neighborhoods",
      zipCodes: "DEFAULT: 12345",
      address: "DEFAULT: 123 Main Street, Your City, State 12345",
    },
  };

  if (
    !subDomainUrlContentJson ||
    typeof subDomainUrlContentJson !== "object" ||
    Object.keys(subDomainUrlContentJson).length === 0
  ) {
    return defaultSubDomainContent;
  }

  const processedSubdomains: any = {};
  for (const [key, locationData] of Object.entries(subDomainUrlContentJson)) {
    if (locationData && typeof locationData === "object") {
      const location = locationData as any;
      processedSubdomains[key] = {
        name: getValueOrDefault(location?.name, `DEFAULT: ${key}`),
        publishedAt: getValueOrDefault(
          location?.publishedAt,
          "DEFAULT: 2025-01-01",
        ),
        slug: getValueOrDefault(location?.slug, `DEFAULT: ${key}`),
        metaTitle: getValueOrDefault(
          location?.metaTitle,
          `DEFAULT: Affordable Dumpster Rental Services in ${location?.name || key}`,
        ),
        metaDescription: getValueOrDefault(
          location?.metaDescription,
          `DEFAULT: Looking for reliable dumpster rental in ${location?.name || key}? We offer fast delivery and affordable pricing.`,
        ),
        bannerImage: getValueOrDefault(
          location?.bannerImage,
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        ),
        h1Banner: getValueOrDefault(
          location?.h1Banner,
          `DEFAULT: Dumpster Rentals in ${location?.name || key} Near You`,
        ),
        h2: getValueOrDefault(
          location?.h2,
          `DEFAULT: Your Trusted Dumpster Rental Partner in ${location?.name || key}`,
        ),
        p2: getValueOrDefault(
          location?.p2,
          `DEFAULT: Professional dumpster rental service in ${location?.name || key} for all your project needs.`,
        ),
        h2Image: getValueOrDefault(
          location?.h2Image,
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        ),
        serviceTtile: getValueOrDefault(
          location?.serviceTtile,
          "DEFAULT: Our Dumpster Rental Services",
        ),
        serviceTitle: getValueOrDefault(
          location?.serviceTitle || location?.serviceTtile,
          "DEFAULT: Our Dumpster Rental Services",
        ),
        needsSection: (() => {
          const defaultNeeds = {
            title: `DEFAULT: Why Choose Us for Dumpster Rental in ${location?.name || key}`,
            description: "DEFAULT: Professional service you can trust",
            needslist: [
              {
                title: "DEFAULT: Same-Day Delivery",
                description:
                  "DEFAULT: Fast delivery so your project doesn't have to wait.",
              },
            ],
          };

          if (
            !location?.needsSection ||
            typeof location.needsSection !== "object"
          ) {
            return defaultNeeds;
          }

          const ensuredNeedsList =
            Array.isArray(location.needsSection.needslist) &&
            location.needsSection.needslist.length > 0
              ? location.needsSection.needslist.map(
                  (need: any, index: number) => ({
                    title: getValueOrDefault(
                      need?.title,
                      `DEFAULT: Service Feature ${index + 1}`,
                    ),
                    description: getValueOrDefault(
                      need?.description,
                      "DEFAULT: Quality service description",
                    ),
                  }),
                )
              : defaultNeeds.needslist;

          return {
            title: getValueOrDefault(
              location.needsSection.title,
              defaultNeeds.title,
            ),
            description: getValueOrDefault(
              location.needsSection.description,
              defaultNeeds.description,
            ),
            needslist: ensuredNeedsList,
          };
        })(),
        processSection: (() => {
          const defaultProcess = {
            title: "DEFAULT: How Our Dumpster Rental Process Works",
            processData: [
              {
                title: "DEFAULT: Choose Your Dumpster",
                description: "DEFAULT: Pick the size that fits your cleanup.",
              },
            ],
          };

          if (
            !location?.processSection ||
            typeof location.processSection !== "object"
          ) {
            return defaultProcess;
          }

          const ensuredProcessData =
            Array.isArray(location.processSection.processData) &&
            location.processSection.processData.length > 0
              ? location.processSection.processData.map(
                  (process: any, index: number) => ({
                    title: getValueOrDefault(
                      process?.title,
                      `DEFAULT: Step ${index + 1}`,
                    ),
                    description: getValueOrDefault(
                      process?.description,
                      "DEFAULT: Process description",
                    ),
                  }),
                )
              : defaultProcess.processData;

          return {
            title: getValueOrDefault(
              location.processSection.title,
              defaultProcess.title,
            ),
            processData: ensuredProcessData,
          };
        })(),
        h5: getValueOrDefault(
          location?.h5,
          "DEFAULT: Affordable Dumpster Rentals Company for Every Occasion",
        ),
        p5: getValueOrDefault(
          location?.p5,
          "DEFAULT: Whether it's a home cleanout or a commercial renovation, our dumpster rentals offer the ideal waste solution.",
        ),
        h5Image: getValueOrDefault(
          location?.h5Image,
          "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
        ),
        faq:
          Array.isArray(location?.faq) && location.faq.length > 0
            ? location.faq.map((faqItem: any, index: number) => ({
                ques: getValueOrDefault(
                  faqItem?.ques,
                  `DEFAULT: Frequently Asked Question ${index + 1}`,
                ),
                ans: getValueOrDefault(
                  faqItem?.ans,
                  "DEFAULT: Professional answer to your dumpster rental question.",
                ),
              }))
            : [
                {
                  ques: "DEFAULT: What size dumpsters do you offer?",
                  ans: "DEFAULT: We offer multiple sizes to suit every project.",
                },
              ],
        reviews: Array.isArray(location?.reviews) ? location.reviews : [],
        neighbourhoods: getValueOrDefault(
          location?.neighbourhoods,
          "DEFAULT: Local Neighborhoods",
        ),
        zipCodes: getValueOrDefault(location?.zipCodes, "DEFAULT: 12345"),
        address: getValueOrDefault(
          location?.address,
          "DEFAULT: 123 Main Street, Your City, State 12345",
        ),
      };
    }
  }

  return Object.keys(processedSubdomains).length > 0
    ? processedSubdomains
    : defaultSubDomainContent;
})();

// DEFAULT: Enhanced utility function to replace placeholders in strings with comprehensive error handling
function replacePlaceholders(obj: any, ContactInfo: any): any {
  // DEFAULT: Ensure ContactInfo has comprehensive default values if missing
  const safeContactInfo = {
    location: ContactInfo?.location || "DEFAULT: Your City, State",
    No: ContactInfo?.No || "DEFAULT: (555) 123-4567",
    tel: ContactInfo?.tel || "DEFAULT: +15551234567",
    mail: ContactInfo?.mail ,
    baseUrl: ContactInfo?.baseUrl || "DEFAULT: https://dumpsterrental.com/",
    host: ContactInfo?.host || "DEFAULT: dumpsterrental.com",
    name: ContactInfo?.name || "DEFAULT: Premier Dumpster Rental",
    address:
      ContactInfo?.address ||
      "DEFAULT: 123 Main Street, Your City, State 12345",
    service: ContactInfo?.service || "DEFAULT: Dumpster Rental",
    zipCode: ContactInfo?.zipCode || "DEFAULT: 12345",
    ...ContactInfo,
  };

  if (typeof obj === "string") {
    return obj
      .split("[location]")
      .join(safeContactInfo.location)
      .split("[phone]")
      .join(safeContactInfo.No);
  } else if (Array.isArray(obj)) {
    return obj.map((item) => replacePlaceholders(item, safeContactInfo));
  } else if (obj && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      result[key] = replacePlaceholders(obj[key], safeContactInfo);
    }
    return result;
  }
  return obj;
}

// DEFAULT: Use contactContent as ContactInfo for replacements with enhanced error handling
const ContactInfo = contactContent || {
  location: "DEFAULT: Your City, State",
  No: "DEFAULT: (555) 123-4567",
  tel: "DEFAULT: +15551234567",
  mail: "",
  baseUrl: "DEFAULT: https://dumpsterrental.com/",
  host: "DEFAULT: dumpsterrental.com",
  name: "DEFAULT: Premier Dumpster Rental",
  address: "DEFAULT: 123 Main Street, Your City, State 12345",
  service: "DEFAULT: Dumpster Rental",
  zipCode: "DEFAULT: 12345",
  bannerImage:
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  logoImage:
    "https://ik.imagekit.io/h7rza8886p/Default1.jpg?updatedAt=1757319001930",
  favicon: "DEFAULT: /favicon.ico",
  googleAnalytics: "DEFAULT: GA_MEASUREMENT_ID",
  minor: "DEFAULT: #fed700",
  main: "DEFAULT: #283143",
};

// DEFAULT: Enhanced comprehensive content export with complete error handling and subdomain support
const content: {
  aboutContent: any;
  contactContent: any;
  contactPageContent: any;
  homePageContent: any;
  locationPageContent: any;
  brandsContent: any;
  servicePageContent: any;
  typesJsonContent: any;
  subDomainUrlContent: any;
} = {
  aboutContent: replacePlaceholders(aboutContent || {}, ContactInfo),
  contactContent: replacePlaceholders(
    contactContent || ContactInfo,
    ContactInfo,
  ),

  contactPageContent: replacePlaceholders(
    contactPageContent || {},
    ContactInfo,
  ),
  homePageContent: replacePlaceholders(homePageContent || {}, ContactInfo),
  locationPageContent: replacePlaceholders(
    locationPageContent || {},
    ContactInfo,
  ),
  brandsContent: replacePlaceholders(brandsContent || {}, ContactInfo),
  servicePageContent: replacePlaceholders(
    servicePageContent || {},
    ContactInfo,
  ),
  typesJsonContent: replacePlaceholders(typesJsonContent || {}, ContactInfo),
  subDomainUrlContent: replacePlaceholders(
    subDomainUrlContent || {},
    ContactInfo,
  ),
};



export default content;
