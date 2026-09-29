import {
  UAppAccent,
  UAppPlatform,
  UAppReleaseStatus,
  UAppReviewStatus,
  UAppSource,
  UAppStatus,
  UAppType,
} from "@prisma/client";

import type { UAppSeedData } from "./uapps.types";

export const uAppsSeedData: UAppSeedData[] = [
  {
    productCode: "ASTRO-ADVISOR",

    name: "مشاور نجومی",

    description:
      "مشاور نجومی شخصی برای تحلیل و بررسی چارت تولد و ترانزیت‌های نجومی.",

    category: "نجوم",

    source: UAppSource.UNIQE,
    sourceLabel: "Uniqe",

    platform: UAppPlatform.WEB,
    platformLabel: "Web",

    type: UAppType.WEB_APP,
    typeLabel: "Web App",

    status: UAppStatus.AVAILABLE,
    statusLabel: "فعال",

    icon: "✨",

    cover: null,

    accent: UAppAccent.PURPLE,

    href: "/uapps/astro-advisor",

    featured: true,
    verified: true,

    version: "1.0.0",

    official: true,

    releaseLabel: "نسخه پایدار",
    releaseStatus: UAppReleaseStatus.STABLE,

    reviewStatus: UAppReviewStatus.APPROVED,

    metadata: {
      slug: "astro-advisor",
      displayNameEn: "Astro Advisor",
      engine: "Swiss Ephemeris",
    },
  },
];