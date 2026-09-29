import type {
  AdminRole,
  UAppAccent,
  UAppPlatform,
  UAppReleaseStatus,
  UAppReviewStatus,
  UAppSource,
  UAppStatus,
  UAppType,
} from "@prisma/client";

export type UAppSeedData = {
  productCode: string;

  name: string;
  description: string;
  category: string;

  source: UAppSource;
  sourceLabel: string;

  platform: UAppPlatform;
  platformLabel: string;

  type: UAppType;
  typeLabel: string;

  status: UAppStatus;
  statusLabel: string;

  icon: string;
  cover?: string | null;

  accent: UAppAccent;
  href: string;

  featured?: boolean;
  verified?: boolean;

  version?: string | null;

  official?: boolean;

  releaseLabel?: string | null;
  releaseStatus?: UAppReleaseStatus | null;

  reviewStatus?: UAppReviewStatus;

  metadata?: Record<string, unknown> | null;

  creatorEmail?: string | null;
  creatorRole?: AdminRole | null;
};