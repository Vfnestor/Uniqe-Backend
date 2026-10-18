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
  SearchResponse,
  SearchResult,
} from "./search.types";

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async search(
    query: SearchQueryDto,
  ): Promise<SearchResponse> {
    const searchTerm =
      query.q.trim();

    const requestedLimit =
      Number(query.limit ?? 20);

    const limit =
      Number.isFinite(requestedLimit)
        ? Math.min(
            50,
            Math.max(
              1,
              Math.trunc(requestedLimit),
            ),
          )
        : 20;

    if (!searchTerm) {
      return {
        query: "",
        total: 0,
        results: [],
      };
    }

    const contains = {
      contains: searchTerm,
      mode: Prisma.QueryMode.insensitive,
    } as const;

    const appWhere = {
      reviewStatus: "APPROVED",
      OR: [
        { name: contains },
        { description: contains },
        { category: contains },
      ],
    } satisfies Prisma.UAppWhereInput;

    const courseWhere = {
      status: "PUBLISHED",
      OR: [
        { title: contains },
        { description: contains },
        { shortDescription: contains },
        { slug: contains },
      ],
    } satisfies Prisma.UCourseWhereInput;

    const categoryWhere = {
      isActive: true,
      OR: [
        { name: contains },
        { description: contains },
        { slug: contains },
      ],
    } satisfies Prisma.UCategoryWhereInput;

    const knowledgeWhere = {
      OR: [
        { title: contains },
        { description: contains },
        { content: contains },
        { slug: contains },
      ],
    } satisfies Prisma.UKnowledgeWhereInput;

    const [
      apps,
      courses,
      categories,
      knowledge,
      appsCount,
      coursesCount,
      categoriesCount,
      knowledgeCount,
    ] = await Promise.all([
      this.prisma.uApp.findMany({
        where: appWhere,
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
        where: courseWhere,
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
        where: categoryWhere,
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
        where: knowledgeWhere,
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

      this.prisma.uApp.count({
        where: appWhere,
      }),

      this.prisma.uCourse.count({
        where: courseWhere,
      }),

      this.prisma.uCategory.count({
        where: categoryWhere,
      }),

      this.prisma.uKnowledge.count({
        where: knowledgeWhere,
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
          icon: item.icon ?? undefined,
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
          href:
            `/uschool/courses/${item.slug}`,
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
          href:
            `/uschool?category=${encodeURIComponent(item.slug)}`,
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
          href:
            `/uschool/knowledge/${item.slug}`,
          icon:
            item.icon || undefined,
          updatedAt: item.updatedAt,
        }),
      ),
    ];

    results.sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() -
        new Date(first.updatedAt).getTime(),
    );

    return {
      query: searchTerm,
      total:
        appsCount +
        coursesCount +
        categoriesCount +
        knowledgeCount,
      results: results.slice(0, limit),
    };
  }
}