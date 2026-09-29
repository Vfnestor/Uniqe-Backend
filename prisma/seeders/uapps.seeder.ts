import type { PrismaClient } from "@prisma/client";

import {
  uAppsSeedData,
} from "../seed-data";

import type {
  UAppSeedData,
} from "../seed-data";

function normalizeNullableString(
  value?: string | null,
): string | null {
  const normalized =
    value?.trim();

  return normalized || null;
}

export async function seedUApps(
  prisma: PrismaClient,
  apps: UAppSeedData[] = uAppsSeedData,
): Promise<void> {
  for (const app of apps) {
    const existing =
      await prisma.uApp.findFirst({
        where: {
          productCode:
            app.productCode,
        },
      });

    const data = {
      name: app.name.trim(),
      description:
        app.description.trim(),
      category:
        app.category.trim(),

      source: app.source,
      sourceLabel:
        app.sourceLabel.trim(),

      platform: app.platform,
      platformLabel:
        app.platformLabel.trim(),

      type: app.type,
      typeLabel:
        app.typeLabel.trim(),

      status: app.status,
      statusLabel:
        app.statusLabel.trim(),

      icon: app.icon.trim(),
      cover:
        normalizeNullableString(
          app.cover,
        ),

      accent: app.accent,

      href: app.href.trim(),

      featured:
        app.featured ?? false,

      verified:
        app.verified ?? false,

      version:
        normalizeNullableString(
          app.version,
        ),

      official:
        app.official ?? false,

      releaseLabel:
        normalizeNullableString(
          app.releaseLabel,
        ),

      productCode:
        app.productCode.trim(),

      releaseStatus:
        app.releaseStatus ?? null,

      reviewStatus:
        app.reviewStatus ??
        "DRAFT",

      rejectionReason:
        null,

      metadata:
        app.metadata ?? null,
    };

    if (existing) {
      await prisma.uApp.update({
        where: {
          id: existing.id,
        },
        data,
      });

      console.log(
        `🔄 UApp updated: ${app.name} (${app.productCode})`,
      );
    } else {
      await prisma.uApp.create({
        data,
      });

      console.log(
        `🆕 UApp created: ${app.name} (${app.productCode})`,
      );
    }
  }
}