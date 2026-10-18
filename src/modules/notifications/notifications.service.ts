import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  PrismaService,
} from "../../database/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async list(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async markOneAsRead(
    userId: string,
    notificationId: string,
  ) {
    const notification =
      await this.prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
      });

    if (!notification) {
      throw new NotFoundException(
        "Notification not found.",
      );
    }

    if (notification.read) {
      return notification;
    }

    return this.prisma.notification.update({
      where: {
        id: notification.id,
      },

      data: {
        read: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    const result =
      await this.prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },

        data: {
          read: true,
          readAt: new Date(),
        },
      });

    return {
      success: true,
      updated: result.count,
    };
  }
}