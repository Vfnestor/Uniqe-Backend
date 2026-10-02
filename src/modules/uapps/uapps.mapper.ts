import type {
  UAppResponse,
  UAppWithCreator,
} from "./uapps.types";

export function mapUApp(
  app: UAppWithCreator,
): UAppResponse {
  return {
    id: app.id,

    name: app.name,
    description: app.description,
    category: app.category,

    source:
      app.source
        .toLowerCase()
        .replace(
          "_",
          "-",
        ) as UAppResponse["source"],

    sourceLabel:
      app.sourceLabel,

    platform:
      app.platform
        .toLowerCase() as UAppResponse["platform"],

    platformLabel:
      app.platformLabel,

    type:
      app.type
        .toLowerCase()
        .replace(
          "_",
          "-",
        ) as UAppResponse["type"],

    typeLabel:
      app.typeLabel,

    status:
      app.status
        .toLowerCase()
        .replace(
          "_",
          "-",
        ) as UAppResponse["status"],

    statusLabel:
      app.statusLabel,

    icon:
      app.icon,

    cover:
      app.cover,

    accent:
      app.accent
        .toLowerCase() as UAppResponse["accent"],

    href:
      app.href,

    featured:
      app.featured,

    verified:
      app.verified,

    version:
      app.version,

    official:
      app.official,

    releaseLabel:
      app.releaseLabel,

    productCode:
      app.productCode,

    releaseStatus:
      app.releaseStatus
        ? app.releaseStatus
            .toLowerCase()
            .replace(
              "_",
              "-",
            ) as UAppResponse["releaseStatus"]
        : null,

    reviewStatus:
      app.reviewStatus
        .toLowerCase()
        .replace(
          "_",
          "-",
        ) as UAppResponse["reviewStatus"],

    rejectionReason:
      app.rejectionReason,

    creator:
      app.creator
        ? {
            id:
              app.creator.id,
            name:
              app.creator.name,
          }
        : null,

    metadata:
      app.metadata,

    createdAt:
      app.createdAt.toISOString(),

    updatedAt:
      app.updatedAt.toISOString(),
  };
}