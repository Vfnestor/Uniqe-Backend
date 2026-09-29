import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import {
  Authorize,
  CurrentUser,
} from "../auth/decorators";

import {
  RBAC_PERMISSIONS,
} from "../auth/rbac";

import type {
  JwtAccessPayload,
} from "../auth/auth.types";

import {
  CreateUAppDto,
  UpdateUAppDto,
} from "./dto";

import {
  UAppsService,
} from "./uapps.service";

@Controller("uapps")
export class UAppsController {
  constructor(
    private readonly uAppsService: UAppsService,
  ) {}

  @Get()
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_VIEW,
    ],
  })
  list(
    @Query(
      "page",
      new ParseIntPipe({
        optional: true,
      }),
    )
    page = 1,

    @Query(
      "limit",
      new ParseIntPipe({
        optional: true,
      }),
    )
    limit = 20,
  ) {
    return this.uAppsService.list(
      page,
      limit,
    );
  }

  @Get(":id")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_VIEW,
    ],
  })
  findById(
    @Param("id")
    id: string,
  ) {
    return this.uAppsService.findById(
      id,
    );
  }

  @Post()
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_MANAGE,
    ],
  })
  create(
    @Body()
    dto: CreateUAppDto,

    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return this.uAppsService.create(
      dto,
      user.sub,
    );
  }

  @Patch(":id")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_MANAGE,
    ],
  })
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateUAppDto,
  ) {
    return this.uAppsService.update(
      id,
      dto,
    );
  }
}