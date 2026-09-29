import {
  RbacService,
} from "./rbac.service";

import {
  RBAC_PERMISSIONS,
} from "./rbac.constants";

describe("RbacService", () => {
  let service: RbacService;

  beforeEach(() => {
    service =
      new RbacService();
  });

  it("should return owner permissions", () => {
    const permissions =
      service.getPermissionsForRole(
        "owner",
      );

    expect(
      permissions,
    ).toContain(
      RBAC_PERMISSIONS.ADMIN_ACCESS,
    );
  });

  it("should return owner permissions for admin role", () => {
    const permissions =
      service.getPermissionsForRole(
        "ADMIN",
      );

    expect(
      permissions,
    ).toContain(
      RBAC_PERMISSIONS.ADMIN_ACCESS,
    );
  });

  it("should return no permissions for user role", () => {
    expect(
      service.getPermissionsForRole(
        "user",
      ),
    ).toEqual([]);
  });

  it("should return no permissions for unknown role", () => {
    expect(
      service.getPermissionsForRole(
        "unknown",
      ),
    ).toEqual([]);
  });

  it("should check permissions correctly", () => {
    expect(
      service.can(
        "owner",
        RBAC_PERMISSIONS.ADMIN_ACCESS,
      ),
    ).toBe(true);

    expect(
      service.can(
        "user",
        RBAC_PERMISSIONS.ADMIN_ACCESS,
      ),
    ).toBe(false);
  });
});