import {
  SetMetadata,
} from "@nestjs/common";

import {
  ROLE_METADATA_KEY,
} from "../rbac/rbac.constants";

import type {
  RbacRole,
} from "../rbac/rbac.types";

export const Roles = (
  ...roles: RbacRole[]
) =>
  SetMetadata(
    ROLE_METADATA_KEY,
    roles,
  );