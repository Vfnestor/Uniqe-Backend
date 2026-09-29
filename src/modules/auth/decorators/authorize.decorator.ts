import {
  applyDecorators,
  UseGuards,
} from "@nestjs/common";

import {
  Permissions,
  Roles,
} from "./index";

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
  }

  const guards = [];

  if (
    options.roles &&
    options.roles.length > 0
  ) {
    guards.push(
      RolesGuard,
    );
  }

  if (
    options.permissions &&
    options.permissions.length > 0
  ) {
    guards.push(
      PermissionsGuard,
    );
  }

  if (guards.length > 0) {
    decorators.push(
      UseGuards(
        ...guards,
      ),
    );
  }

  return applyDecorators(
    ...decorators,
  );
}