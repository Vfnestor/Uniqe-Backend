import {
  Reflector,
} from "@nestjs/core";

import {
  ROLE_METADATA_KEY,
  PERMISSION_METADATA_KEY,
  RBAC_PERMISSIONS,
  RBAC_ROLES,
} from "../rbac/rbac.constants";

import {
  Authorize,
} from "./authorize.decorator";

describe("Authorize Decorator", () => {
  it("should apply role metadata", () => {
    class TestController {
      @Authorize({
        roles: [
          RBAC_ROLES.OWNER,
        ],
      })
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

  it("should apply permission metadata", () => {
    class TestController {
      @Authorize({
        permissions: [
          RBAC_PERMISSIONS.ADMIN_ACCESS,
        ],
      })
      test() {}
    }

    const permissions =
      Reflect.getMetadata(
        PERMISSION_METADATA_KEY,
        TestController.prototype.test,
      );

    expect(
      permissions,
    ).toEqual([
      RBAC_PERMISSIONS.ADMIN_ACCESS,
    ]);
  });

  it("should apply both role and permission metadata", () => {
    class TestController {
      @Authorize({
        roles: [
          RBAC_ROLES.OWNER,
        ],
        permissions: [
          RBAC_PERMISSIONS.ADMIN_ACCESS,
        ],
      })
      test() {}
    }

    expect(
      Reflect.getMetadata(
        ROLE_METADATA_KEY,
        TestController.prototype.test,
      ),
    ).toEqual([
      RBAC_ROLES.OWNER,
    ]);

    expect(
      Reflect.getMetadata(
        PERMISSION_METADATA_KEY,
        TestController.prototype.test,
      ),
    ).toEqual([
      RBAC_PERMISSIONS.ADMIN_ACCESS,
    ]);
  });
});