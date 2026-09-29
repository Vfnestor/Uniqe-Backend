import {
  applyDecorators,
  UseGuards,
} from "@nestjs/common";

import {
  Permissions,
  Roles,
} from ".";

import {
  PermissionsGuard,
  RolesGuard,
} from "../guards";

import type {
  RbacPermission,
  RbacRole,
} from "../rbac";

export function Authorize(
  options: {
    roles?: RbacRole[];
    permissions?: RbacPermission[];
  } = {},
) {
  const decorators = [];

  if (
    options.roles &&
    options.roles.length > 0
  ) {
    decorators.push(
      Roles(
        ...options.roles,
      ),
    );

    decorators.push(
      UseGuards(
        RolesGuard,
      ),
    );
  }

  if (
    options.permissions &&
    options.permissions.length > 0
  ) {
    decorators.push(
      Permissions(
        ...options.permissions,
      ),
    );

    decorators.push(
      UseGuards(
        PermissionsGuard,
      ),
    );
  }

  return applyDecorators(
    ...decorators,
  );
}