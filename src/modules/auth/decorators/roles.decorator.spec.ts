import {
  Reflector,
} from "@nestjs/core";

import {
  Roles,
} from "./roles.decorator";

import {
  ROLE_METADATA_KEY,
  RBAC_ROLES,
} from "../rbac/rbac.constants";

describe("Roles Decorator", () => {
  it("should store role metadata", () => {
    class TestController {
      @Roles(RBAC_ROLES.OWNER)
      test() {}
    }

    const roles =
      Reflect.getMetadata(
        ROLE_METADATA_KEY,
        TestController.prototype.test,
      );

    expect(roles).toEqual([
      RBAC_ROLES.OWNER,
    ]);
  });
});