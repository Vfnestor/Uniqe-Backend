import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

import {
  Reflector,
} from "@nestjs/core";

import {
  PERMISSION_METADATA_KEY,
} from "../rbac/rbac.constants";

import type {
  JwtAccessPayload,
} from "../auth.types";

import type {
  RbacPermission,
} from "../rbac/rbac.types";

import {
  hasPermission,
} from "../rbac/rbac.utils";

@Injectable()
export class PermissionsGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredPermissions =
      this.reflector.getAllAndOverride<
        RbacPermission[] | undefined
      >(
        PERMISSION_METADATA_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (
      !requiredPermissions ||
      requiredPermissions.length === 0
    ) {
      return true;
    }

    const request =
      context
        .switchToHttp()
        .getRequest<{
          user?: JwtAccessPayload;
        }>();

    const user =
      request.user;

    if (!user) {
      throw new ForbiddenException(
        "Authenticated user is required.",
      );
    }

    const allowed =
      requiredPermissions.every(
        (permission) =>
          hasPermission(
            user.role,
            permission,
          ),
      );

    if (allowed) {
      return true;
    }

    throw new ForbiddenException(
      "You do not have the required permissions.",
    );
  }
}