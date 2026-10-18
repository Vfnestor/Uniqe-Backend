import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";

import {
  CurrentUser,
} from "../auth/decorators";

import {
  JwtAuthGuard,
} from "../auth/guards";

import {
  MarkNotificationReadDto,
} from "./dto/mark-notification-read.dto";

import {
  NotificationsService,
} from "./notifications.service";

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  async list(
    @CurrentUser()
    user: {
      sub: string;
    },
  ) {
    return this.notificationsService.list(
      user.sub,
    );
  }

  @Patch(":id/read")
  async markOneAsRead(
    @CurrentUser()
    user: {
      sub: string;
    },

    @Param("id")
    id: string,
  ) {
    return this.notificationsService.markOneAsRead(
      user.sub,
      id,
    );
  }

  @Patch("read")
  @HttpCode(HttpStatus.OK)
  async markAsRead(
    @CurrentUser()
    user: {
      sub: string;
    },

    @Body()
    dto: MarkNotificationReadDto,
  ) {
    if (dto.id) {
      return this.notificationsService.markOneAsRead(
        user.sub,
        dto.id,
      );
    }

    return this.notificationsService.markAllAsRead(
      user.sub,
    );
  }
}