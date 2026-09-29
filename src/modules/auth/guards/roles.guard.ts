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
  ROLE_METADATA_KEY,
} from "../rbac/rbac.constants";

import type {
  JwtAccessPayload,
} from "../auth.types";

import type {
  RbacRole,
} from "../rbac/rbac.types";

import {
  hasRole,
} from "../rbac/rbac.utils";

@Injectable()
export class RolesGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<
        RbacRole[] | undefined
      >(
        ROLE_METADATA_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (
      !requiredRoles ||
      requiredRoles.length === 0
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
        "User role is unavailable.",
      );
    }

    if (
      hasRole(
        user.role,
        requiredRoles,
      )
    ) {
      return true;
    }

    throw new ForbiddenException(
      "You do not have permission to access this resource.",
    );
  }
}