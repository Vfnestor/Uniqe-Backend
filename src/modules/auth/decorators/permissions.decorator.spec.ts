import {
  Permissions,
} from "./permissions.decorator";

import {
  PERMISSION_METADATA_KEY,
  RBAC_PERMISSIONS,
} from "../rbac/rbac.constants";

describe("Permissions Decorator", () => {
  it("should store permission metadata", () => {
    class TestController {
      @Permissions(
        RBAC_PERMISSIONS.ADMIN_ACCESS,
        RBAC_PERMISSIONS.UAPPS_VIEW,
      )
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
      RBAC_PERMISSIONS.UAPPS_VIEW,
    ]);
  });
});