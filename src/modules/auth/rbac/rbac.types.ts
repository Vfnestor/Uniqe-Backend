import {
  RBAC_PERMISSIONS,
  RBAC_ROLES,
} from "./rbac.constants";

export type RbacRole =
  (typeof RBAC_ROLES)[keyof typeof RBAC_ROLES];

export type RbacPermission =
  (typeof RBAC_PERMISSIONS)[keyof typeof RBAC_PERMISSIONS];

export type RbacUser = {
  sub: string;
  role: string;
};

export type RbacCheckContext = {
  user: RbacUser;
  roles?: RbacRole[];
  permissions?: RbacPermission[];
};