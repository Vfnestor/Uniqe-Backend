import type {
  UApp,
  User,
} from "@prisma/client";

export type UAppSource =
  | "user"
  | "uniqe"
  | "google-play"
  | "app-store";

export type UAppPlatform =
  | "web"
  | "android"
  | "ios"
  | "windows"
  | "macos"
  | "linux"
  | "multi";

export type UAppType =
  | "web-app"
  | "installable"
  | "hybrid";

export type UAppStatus =
  | "available"
  | "development"
  | "coming-soon"
  | "experimental";

export type UAppAccent =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "black"
  | "pink"
  | "red";

export type UAppReviewStatus =
  | "draft"
  | "pending-review"
  | "approved"
  | "rejected";

export type UAppResponse = {
  id: string;

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
  cover: string | null;
  accent: UAppAccent;

  href: string;

  featured: boolean;
  verified: boolean;

  version: string | null;
  official: boolean;
  releaseLabel: string | null;

  productCode: string | null;
  releaseStatus:
    | "stable"
    | "beta"
    | "development"
    | "coming-soon"
    | null;

  reviewStatus: UAppReviewStatus;

  rejectionReason: string | null;

  creator: {
    id: string;
    name: string;
  } | null;

  metadata: unknown;

  createdAt: string;
  updatedAt: string;
};

export type UAppWithCreator =
  UApp & {
    creator:
      | Pick<
          User,
          "id" | "name"
        >
      | null;
  };

export type UAppListResponse = {
  items: UAppResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};