import {
  Injectable,
} from "@nestjs/common";

import {
  getRolePermissions,
} from "./rbac.permissions";

import {
  normalizeRole,
} from "./rbac.utils";

import type {
  RbacPermission,
} from "./rbac.types";

@Injectable()
export class RbacService {
  getPermissionsForRole(
    role: string,
  ): RbacPermission[] {
    const normalizedRole =
      normalizeRole(role);

    if (!normalizedRole) {
      return [];
    }

    return getRolePermissions(
      normalizedRole,
    );
  }

  can(
    role: string,
    permission: RbacPermission,
  ): boolean {
    return this.getPermissionsForRole(
      role,
    ).includes(permission);
  }
}