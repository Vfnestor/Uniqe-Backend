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

import {
  CreateFavoriteDto,
} from "./dto/create-favorite.dto";

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async list(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(
    userId: string,
    dto: CreateFavoriteDto,
  ) {
    const existing =
      await this.prisma.favorite.findFirst({
        where: {
          userId,
          targetId: dto.targetId,
        },
      });

    if (existing) {
      return existing;
    }

    const data: Prisma.FavoriteCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },

      targetId: dto.targetId,

      title: dto.title.trim(),

      description: dto.description.trim(),

      category: dto.category,

      href: dto.href.trim(),

      ...(dto.icon !== undefined
        ? {
            icon: dto.icon.trim(),
          }
        : {}),

      ...(dto.metadata !== undefined
        ? {
            metadata:
              dto.metadata as Prisma.InputJsonValue,
          }
        : {}),
    };

    return this.prisma.favorite.create({
      data,
    });
  }

  async remove(
    userId: string,
    targetId: string,
  ) {
    const favorite =
      await this.prisma.favorite.findFirst({
        where: {
          userId,
          targetId,
        },
      });

    if (!favorite) {
      throw new NotFoundException(
        "Favorite not found.",
      );
    }

    await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return {
      success: true,
      id: favorite.id,
      targetId: favorite.targetId,
    };
  }
}