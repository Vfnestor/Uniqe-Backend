import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  Prisma,
} from "@prisma/client";

import {
  PrismaService,
} from "../../database/prisma.service";

import type {
  CreateUAppDto,
  ListUAppsQueryDto,
  UpdateUAppDto,
} from "./dto";

import {
  mapUApp,
} from "./uapps.mapper";

import type {
  UAppListResponse,
} from "./uapps.types";

@Injectable()
export class UAppsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async list(
    query: ListUAppsQueryDto = {},
  ): Promise<UAppListResponse> {
    const safePage =
      Math.max(
        1,
        query.page ?? 1,
      );

    const safeLimit =
      Math.min(
        100,
        Math.max(
          1,
          query.limit ?? 20,
        ),
      );

    const skip =
      (safePage - 1) *
      safeLimit;

    const where: Prisma.UAppWhereInput =
      {};

    const search =
      query.search?.trim();

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (query.category) {
      where.category = {
        equals:
          query.category.trim(),
        mode: "insensitive",
      };
    }

    if (query.source) {
      where.source =
        query.source
          .toUpperCase()
          .replace(
            "-",
            "_",
          ) as Prisma.UAppWhereInput["source"];
    }

    if (query.platform) {
      where.platform =
        query.platform
          .toUpperCase() as Prisma.UAppWhereInput["platform"];
    }

    if (query.type) {
      where.type =
        query.type
          .toUpperCase()
          .replace(
            "-",
            "_",
          ) as Prisma.UAppWhereInput["type"];
    }

    if (query.status) {
      where.status =
        query.status
          .toUpperCase()
          .replace(
            "-",
            "_",
          ) as Prisma.UAppWhereInput["status"];
    }

    if (query.accent) {
      where.accent =
        query.accent
          .toUpperCase() as Prisma.UAppWhereInput["accent"];
    }

    if (query.reviewStatus) {
      where.reviewStatus =
        query.reviewStatus
          .toUpperCase()
          .replace(
            "-",
            "_",
          ) as Prisma.UAppWhereInput["reviewStatus"];
    }

    if (
      query.featured !==
      undefined
    ) {
      where.featured =
        query.featured;
    }

    if (
      query.verified !==
      undefined
    ) {
      where.verified =
        query.verified;
    }

    if (
      query.official !==
      undefined
    ) {
      where.official =
        query.official;
    }

    const [
      apps,
      total,
    ] =
      await Promise.all([
        this.prisma.uApp.findMany({
          where,
          skip,
          take: safeLimit,
          orderBy: [
            {
              featured:
                "desc",
            },
            {
              createdAt:
                "desc",
            },
          ],
          include: {
            creator: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),

        this.prisma.uApp.count({
          where,
        }),
      ]);

    return {
      items: apps.map(
        mapUApp,
      ),

      meta: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages:
          Math.ceil(
            total /
              safeLimit,
          ),
      },
    };
  }

  async findById(
    id: string,
  ) {
    const app =
      await this.prisma.uApp.findUnique({
        where: {
          id,
        },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

    if (!app) {
      throw new NotFoundException(
        "UApp not found.",
      );
    }

    return mapUApp(app);
  }

  async create(
    dto: CreateUAppDto,
    creatorId?: string,
  ) {
    const app =
      await this.prisma.uApp.create({
        data: {
          name:
            dto.name.trim(),

          description:
            dto.description.trim(),

          category:
            dto.category.trim(),

          source:
            dto.source
              .toUpperCase()
              .replace(
                "-",
                "_",
              ) as any,

          sourceLabel:
            dto.sourceLabel.trim(),

          platform:
            dto.platform
              .toUpperCase() as any,

          platformLabel:
            dto.platformLabel.trim(),

          type:
            dto.type
              .toUpperCase()
              .replace(
                "-",
                "_",
              ) as any,

          typeLabel:
            dto.typeLabel.trim(),

          status:
            dto.status
              .toUpperCase()
              .replace(
                "-",
                "_",
              ) as any,

          statusLabel:
            dto.statusLabel.trim(),

          icon:
            dto.icon.trim(),

          cover:
            dto.cover?.trim(),

          accent:
            dto.accent
              .toUpperCase() as any,

          href:
            dto.href.trim(),

          featured:
            dto.featured ??
            false,

          verified:
            dto.verified ??
            false,

          version:
            dto.version?.trim(),

          official:
            dto.official ??
            false,

          releaseLabel:
            dto.releaseLabel?.trim(),

          productCode:
            dto.productCode?.trim(),

          releaseStatus:
            dto.releaseStatus
              ? dto.releaseStatus
                  .toUpperCase()
                  .replace(
                    "-",
                    "_",
                  ) as any
              : undefined,

          metadata:
            dto.metadata,

          creator:
            creatorId
              ? {
                  connect: {
                    id: creatorId,
                  },
                }
              : undefined,
        },

        include: {
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

    return mapUApp(app);
  }

  async update(
    id: string,
    dto: UpdateUAppDto,
  ) {
    await this.findById(id);

    const data: any = {};

    if (
      dto.name !==
      undefined
    ) {
      data.name =
        dto.name.trim();
    }

    if (
      dto.description !==
      undefined
    ) {
      data.description =
        dto.description.trim();
    }

    if (
      dto.category !==
      undefined
    ) {
      data.category =
        dto.category.trim();
    }

    if (
      dto.sourceLabel !==
      undefined
    ) {
      data.sourceLabel =
        dto.sourceLabel.trim();
    }

    if (
      dto.platformLabel !==
      undefined
    ) {
      data.platformLabel =
        dto.platformLabel.trim();
    }

    if (
      dto.typeLabel !==
      undefined
    ) {
      data.typeLabel =
        dto.typeLabel.trim();
    }

    if (
      dto.statusLabel !==
      undefined
    ) {
      data.statusLabel =
        dto.statusLabel.trim();
    }

    if (
      dto.icon !==
      undefined
    ) {
      data.icon =
        dto.icon.trim();
    }

    if (
      dto.cover !==
      undefined
    ) {
      data.cover =
        dto.cover.trim();
    }

    if (
      dto.accent !==
      undefined
    ) {
      data.accent =
        dto.accent.toUpperCase();
    }

    if (
      dto.href !==
      undefined
    ) {
      data.href =
        dto.href.trim();
    }

    if (
      dto.featured !==
      undefined
    ) {
      data.featured =
        dto.featured;
    }

    if (
      dto.verified !==
      undefined
    ) {
      data.verified =
        dto.verified;
    }

    if (
      dto.version !==
      undefined
    ) {
      data.version =
        dto.version.trim();
    }

    if (
      dto.official !==
      undefined
    ) {
      data.official =
        dto.official;
    }

    if (
      dto.releaseLabel !==
      undefined
    ) {
      data.releaseLabel =
        dto.releaseLabel.trim();
    }

    if (
      dto.productCode !==
      undefined
    ) {
      data.productCode =
        dto.productCode.trim();
    }

    if (
      dto.releaseStatus !==
      undefined
    ) {
      data.releaseStatus =
        dto.releaseStatus
          .toUpperCase()
          .replace(
            "-",
            "_",
          );
    }

    if (
      dto.metadata !==
      undefined
    ) {
      data.metadata =
        dto.metadata;
    }

    const app =
      await this.prisma.uApp.update({
        where: {
          id,
        },
        data,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

    return mapUApp(app);
  }
}