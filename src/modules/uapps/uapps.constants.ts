export const UAPPS_ROUTE =
  "uapps";

export const UAPPS_DEFAULT_PAGE =
  1;

export const UAPPS_DEFAULT_LIMIT =
  20;

export const UAPPS_MAX_LIMIT =
  100;

export const UAPPS_MAX_SEARCH_LENGTH =
  100;

export const UAPP_SOURCES = {
  USER: "user",
  UNIQE: "uniqe",
  GOOGLE_PLAY:
    "google-play",
  APP_STORE:
    "app-store",
} as const;

export const UAPP_PLATFORMS = {
  WEB: "web",
  ANDROID: "android",
  IOS: "ios",
  WINDOWS: "windows",
  MACOS: "macos",
  LINUX: "linux",
  MULTI: "multi",
} as const;

export const UAPP_TYPES = {
  WEB_APP: "web-app",
  INSTALLABLE: "installable",
  HYBRID: "hybrid",
} as const;

export const UAPP_STATUSES = {
  AVAILABLE: "available",
  DEVELOPMENT: "development",
  COMING_SOON: "coming-soon",
  EXPERIMENTAL: "experimental",
} as const;

export const UAPP_ACCENTS = {
  BLUE: "blue",
  PURPLE: "purple",
  GREEN: "green",
  ORANGE: "orange",
  BLACK: "black",
  PINK: "pink",
  RED: "red",
} as const;

export const UAPP_REVIEW_STATUSES = {
  DRAFT: "draft",
  PENDING_REVIEW:
    "pending-review",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const UAPP_REVIEW_MAX_REJECTION_REASON_LENGTH =
  1000;