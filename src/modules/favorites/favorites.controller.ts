import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import {
  CurrentUser,
} from "../auth/decorators";

import {
  JwtAuthGuard,
} from "../auth/guards";

import {
  CreateFavoriteDto,
} from "./dto/create-favorite.dto";

import {
  FavoritesService,
} from "./favorites.service";

@Controller("favorites")
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  async list(
    @CurrentUser()
    user: {
      sub: string;
    },
  ) {
    return this.favoritesService.list(
      user.sub,
    );
  }

  @Post()
  async create(
    @CurrentUser()
    user: {
      sub: string;
    },

    @Body()
    dto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(
      user.sub,
      dto,
    );
  }

  @Delete(":targetId")
  @HttpCode(HttpStatus.OK)
  async remove(
    @CurrentUser()
    user: {
      sub: string;
    },

    @Param("targetId")
    targetId: string,
  ) {
    return this.favoritesService.remove(
      user.sub,
      targetId,
    );
  }
}