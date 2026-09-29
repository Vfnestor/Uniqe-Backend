import {
  RBAC_ROLES,
} from "./rbac.constants";

import type {
  RbacPermission,
  RbacRole,
} from "./rbac.types";

export function normalizeRole(
  role: string,
): RbacRole | null {
  const normalized =
    role.trim().toLowerCase();

  if (
    normalized === "admin" ||
    normalized === "owner"
  ) {
    return RBAC_ROLES.OWNER;
  }

  if (
    normalized === "user"
  ) {
    return RBAC_ROLES.USER;
  }

  return null;
}

export function hasRole(
  role: string,
  requiredRoles: RbacRole[],
): boolean {
  const normalizedRole =
    normalizeRole(role);

  if (!normalizedRole) {
    return false;
  }

  return requiredRoles.includes(
    normalizedRole,
  );
}

export function hasPermission(
  role: string,
  permission: RbacPermission,
): boolean {
  const normalizedRole =
    normalizeRole(role);

  if (
    normalizedRole ===
    RBAC_ROLES.OWNER
  ) {
    return true;
  }

  return false;
}