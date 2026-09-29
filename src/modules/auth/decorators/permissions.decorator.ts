import {
  SetMetadata,
} from "@nestjs/common";

import {
  PERMISSION_METADATA_KEY,
} from "../rbac/rbac.constants";

import type {
  RbacPermission,
} from "../rbac/rbac.types";

export const Permissions = (
  ...permissions: RbacPermission[]
) =>
  SetMetadata(
    PERMISSION_METADATA_KEY,
    permissions,
  );