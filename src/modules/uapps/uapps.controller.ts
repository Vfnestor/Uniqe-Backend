import {
  Body,
  Controller,
  Get,
  Param,
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
  ListUAppsQueryDto,
  ReviewUAppDto,
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
    @Query()
    query: ListUAppsQueryDto,
  ) {
    return this.uAppsService.list(
      query,
    );
  }

  @Get("mine")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_CREATE,
    ],
  })
  listMine(
    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return this.uAppsService.listMine(
      user.sub,
    );
  }

  @Get("moderation")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_MANAGE,
    ],
  })
  listPendingReview() {
    return this.uAppsService.listPendingReview();
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

    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return this.uAppsService.findById(
      id,
      user,
    );
  }

  @Post()
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_CREATE,
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
      user,
    );
  }

  @Patch(":id")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_CREATE,
    ],
  })
  update(
    @Param("id")
    id: string,

    @Body()
    dto: UpdateUAppDto,

    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return this.uAppsService.update(
      id,
      dto,
      user,
    );
  }

  @Post(":id/submit-review")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_CREATE,
    ],
  })
  submitForReview(
    @Param("id")
    id: string,

    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return this.uAppsService.submitForReview(
      id,
      user,
    );
  }

  @Post(":id/approve")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_MANAGE,
    ],
  })
  approve(
    @Param("id")
    id: string,
  ) {
    return this.uAppsService.approve(
      id,
    );
  }

  @Post(":id/reject")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.UAPPS_MANAGE,
    ],
  })
  reject(
    @Param("id")
    id: string,

    @Body()
    dto: ReviewUAppDto,
  ) {
    return this.uAppsService.reject(
      id,
      dto,
    );
  }
}