import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import {
  Authorize,
  CurrentUser,
} from "../decorators";

import {
  JwtAuthGuard,
} from "../guards";

import {
  RBAC_PERMISSIONS,
  RBAC_ROLES,
} from "./rbac.constants";

import {
  RbacService,
} from "./rbac.service";

import type {
  JwtAccessPayload,
} from "../auth.types";

@Controller("auth/rbac")
@UseGuards(
  JwtAuthGuard,
)
export class RbacController {
  constructor(
    private readonly rbacService: RbacService,
  ) {}

  @Get("authenticated")
  authenticated(
    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return {
      message:
        "Authenticated RBAC endpoint.",
      userId: user.sub,
      role: user.role,
    };
  }

  @Get("owner")
  @Authorize({
    roles: [
      RBAC_ROLES.OWNER,
    ],
  })
  ownerOnly(
    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return {
      message:
        "Owner RBAC access granted.",
      userId: user.sub,
      role: user.role,
    };
  }

  @Get("admin-access")
  @Authorize({
    permissions: [
      RBAC_PERMISSIONS.ADMIN_ACCESS,
    ],
  })
  adminAccess(
    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return {
      message:
        "Admin permission granted.",
      userId: user.sub,
      role: user.role,
      permission:
        RBAC_PERMISSIONS.ADMIN_ACCESS,
    };
  }

  @Get("permissions")
  permissions(
    @CurrentUser()
    user: JwtAccessPayload,
  ) {
    return {
      role: user.role,
      permissions:
        this.rbacService
          .getPermissionsForRole(
            user.role,
          ),
    };
  }
}