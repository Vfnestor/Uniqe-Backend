import {
  getRolePermissions,
  ROLE_PERMISSIONS,
} from "./rbac.permissions";

import {
  RBAC_PERMISSIONS,
  RBAC_ROLES,
} from "./rbac.constants";

describe("RBAC Permissions", () => {
  it("should define permissions for user role", () => {
    expect(
      ROLE_PERMISSIONS[
        RBAC_ROLES.USER
      ],
    ).toEqual([]);
  });

  it("should give owner all defined permissions", () => {
    const permissions =
      getRolePermissions(
        RBAC_ROLES.OWNER,
      );

    const definedPermissions =
      Object.values(
        RBAC_PERMISSIONS,
      );

    expect(
      permissions,
    ).toEqual(
      expect.arrayContaining(
        definedPermissions,
      ),
    );

    expect(
      permissions.length,
    ).toBe(
      definedPermissions.length,
    );
  });

  it("should return a new permission array", () => {
    const first =
      getRolePermissions(
        RBAC_ROLES.OWNER,
      );

    const second =
      getRolePermissions(
        RBAC_ROLES.OWNER,
      );

    expect(first).not.toBe(second);
    expect(first).toEqual(second);
  });
});