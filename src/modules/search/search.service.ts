import {
  Injectable,
} from "@nestjs/common";

import {
  Prisma,
} from "@prisma/client";

import {
  PrismaService,
} from "../../database/prisma.service";

import {
  SearchQueryDto,
} from "./dto/search-query.dto";

import {
  mapSearchResult,
} from "./search.mapper";

import type {
  SearchResult,
} from "./search.types";

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async search(
    query: SearchQueryDto,
  ): Promise<{
    query: string;
    total: number;
    results: SearchResult[];
  }> {
    const searchTerm =
      query.q.trim();

    const limit = Math.min(
      50,
      Math.max(
        1,
        query.limit ?? 20,
      ),
    );

    if (!searchTerm) {
      return {
        query: searchTerm,
        total: 0,
        results: [],
      };
    }

    const contains = {
      contains: searchTerm,
      mode: Prisma.QueryMode.insensitive,
    } as const;

    const [
      apps,
      courses,
      categories,
      knowledge,
    ] = await Promise.all([
      this.prisma.uApp.findMany({
        where: {
          reviewStatus: "APPROVED",
          OR: [
            {
              name: contains,
            },
            {
              description: contains,
            },
            {
              category: contains,
            },
          ],
        },

        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          href: true,
          icon: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt: "desc",
        },

        take: limit,
      }),

      this.prisma.uCourse.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            {
              title: contains,
            },
            {
              description: contains,
            },
            {
              shortDescription: contains,
            },
            {
              slug: contains,
            },
          ],
        },

        select: {
          id: true,
          title: true,
          description: true,
          shortDescription: true,
          slug: true,
          cover: true,
          thumbnail: true,
          updatedAt: true,
        },

        orderBy: [
          {
            featured: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],

        take: limit,
      }),

      this.prisma.uCategory.findMany({
        where: {
          isActive: true,
          OR: [
            {
              name: contains,
            },
            {
              description: contains,
            },
            {
              slug: contains,
            },
          ],
        },

        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          icon: true,
          cover: true,
          updatedAt: true,
        },

        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            updatedAt: "desc",
          },
        ],

        take: limit,
      }),

      this.prisma.uKnowledge.findMany({
        where: {
          OR: [
            {
              title: contains,
            },
            {
              description: contains,
            },
            {
              content: contains,
            },
            {
              slug: contains,
            },
          ],
        },

        select: {
          id: true,
          title: true,
          description: true,
          slug: true,
          icon: true,
          updatedAt: true,
        },

        orderBy: {
          updatedAt: "desc",
        },

        take: limit,
      }),
    ]);

    const results: SearchResult[] = [
      ...apps.map((item) =>
        mapSearchResult({
          id: item.id,
          type: "uapp",
          title: item.name,
          description: item.description,
          category: item.category,
          href: item.href,
          icon: item.icon,
          updatedAt: item.updatedAt,
        }),
      ),

      ...courses.map((item) =>
        mapSearchResult({
          id: item.id,
          type: "course",
          title: item.title,
          description:
            item.shortDescription ||
            item.description ||
            "",
          href: `/uschool/courses/${item.slug}`,
          icon:
            item.thumbnail ||
            item.cover ||
            undefined,
          updatedAt: item.updatedAt,
        }),
      ),

      ...categories.map((item) =>
        mapSearchResult({
          id: item.id,
          type: "category",
          title: item.name,
          description:
            item.description || "",
          href: `/uschool?category=${encodeURIComponent(item.slug)}`,
          icon:
            item.icon ||
            item.cover ||
            undefined,
          updatedAt: item.updatedAt,
        }),
      ),

      ...knowledge.map((item) =>
        mapSearchResult({
          id: item.id,
          type: "knowledge",
          title: item.title,
          description:
            item.description || "",
          href: `/uschool/knowledge/${item.slug}`,
          icon: item.icon || undefined,
          updatedAt: item.updatedAt,
        }),
      ),
    ];

    results.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    );

    const limitedResults =
      results.slice(0, limit);

    return {
      query: searchTerm,
      total: limitedResults.length,
      results: limitedResults,
    };
  }
}