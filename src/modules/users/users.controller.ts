import {
  Body,
  Controller,
  Get,
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
  UpdatePreferencesDto,
  UpdateProfileDto,
} from "./dto";

import {
  UsersService,
} from "./users.service";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get("me")
  async getMe(
    @CurrentUser()
    user: {
      sub: string;
    },
  ) {
    return this.usersService.getMe(
      user.sub,
    );
  }

  @Get("me/profile")
  async getProfile(
    @CurrentUser()
    user: {
      sub: string;
    },
  ) {
    return this.usersService.getProfile(
      user.sub,
    );
  }

  @Patch("me/profile")
  async updateProfile(
    @CurrentUser()
    user: {
      sub: string;
    },
    @Body()
    dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(
      user.sub,
      dto,
    );
  }

  @Get("me/preferences")
  async getPreferences(
    @CurrentUser()
    user: {
      sub: string;
    },
  ) {
    return this.usersService.getPreferences(
      user.sub,
    );
  }

  @Patch("me/preferences")
  async updatePreferences(
    @CurrentUser()
    user: {
      sub: string;
    },
    @Body()
    dto: UpdatePreferencesDto,
  ) {
    return this.usersService.updatePreferences(
      user.sub,
      dto,
    );
  }
}