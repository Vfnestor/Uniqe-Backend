import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { ActivityQueryDto } from "./dto/activity-query.dto";
import type { ActivityItem } from "./activity.types";

@Injectable()
export class ActivityService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async list(
    userId: string,
    query: ActivityQueryDto,
  ) {
    const requestedLimit = Number(query.limit ?? 20);

    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.trunc(requestedLimit), 1), 50)
      : 20;

    const [
      favorites,
      notifications,
      xpTransactions,
      coinTransactions,
    ] = await Promise.all([
      this.prisma.favorite.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          href: true,
          createdAt: true,
        },
      }),

      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          message: true,
          category: true,
          href: true,
          createdAt: true,
        },
      }),

      this.prisma.uXPTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          amount: true,
          reason: true,
          createdAt: true,
        },
      }),

      this.prisma.uCoinTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          amount: true,
          type: true,
          reason: true,
          createdAt: true,
        },
      }),
    ]);

    const items: ActivityItem[] = [
      ...favorites.map((item) => ({
        id: `favorite-${item.id}`,
        type: "favorite",
        title: `Saved ${item.title}`,
        description:
          item.description ||
          `Added ${item.title} to your favorites.`,
        icon: "⭐",
        href: item.href,
        createdAt: item.createdAt.toISOString(),
      })),

      ...notifications.map((item) => ({
        id: `notification-${item.id}`,
        type: "notification",
        title: item.title,
        description: item.message,
        icon: "🔔",
        href: item.href ?? undefined,
        createdAt: item.createdAt.toISOString(),
      })),

      ...xpTransactions.map((item) => ({
        id: `xp-${item.id}`,
        type: "experience",
        title: "Experience points updated",
        description:
          item.reason ||
          `${item.amount >= 0 ? "Earned" : "Adjusted"} ${Math.abs(item.amount)} XP.`,
        icon: "✨",
        createdAt: item.createdAt.toISOString(),
      })),

      ...coinTransactions.map((item) => ({
        id: `coin-${item.id}`,
        type: "coins",
        title: "U Coin balance activity",
        description:
          item.reason ||
          `${item.type === "EARN" ? "Earned" : item.type === "SPEND" ? "Spent" : "Adjusted"} ${Math.abs(item.amount)} U Coins.`,
        icon: "🪙",
        createdAt: item.createdAt.toISOString(),
      })),
    ];

    items.sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    );

    const visibleItems = items.slice(0, limit);

    return {
      items: visibleItems,
      total: visibleItems.length,
      limit,
    };
  }
}