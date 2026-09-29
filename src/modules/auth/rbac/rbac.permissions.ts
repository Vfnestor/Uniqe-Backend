import {
  RBAC_PERMISSIONS,
  RBAC_ROLES,
} from "./rbac.constants";

import type {
  RbacPermission,
  RbacRole,
} from "./rbac.types";

const ALL_PERMISSIONS =
  Object.values(
    RBAC_PERMISSIONS,
  ) as RbacPermission[];

export const ROLE_PERMISSIONS: Record<
  RbacRole,
  RbacPermission[]
> = {
  [RBAC_ROLES.USER]: [
    RBAC_PERMISSIONS.UAPPS_VIEW,
    RBAC_PERMISSIONS.UAPPS_CREATE,
  ],

  [RBAC_ROLES.OWNER]:
    ALL_PERMISSIONS,
};

export function getRolePermissions(
  role: RbacRole,
): RbacPermission[] {
  return [
    ...(
      ROLE_PERMISSIONS[role] ??
      []
    ),
  ];
}