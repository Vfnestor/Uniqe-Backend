import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
  hasRole,
  normalizeRole,
} from "./rbac.utils";

import {
  RBAC_PERMISSIONS,
  RBAC_ROLES,
} from "./rbac.constants";

describe("RBAC Utils", () => {
  describe("normalizeRole", () => {
    it("should normalize user role", () => {
      expect(
        normalizeRole("USER"),
      ).toBe(RBAC_ROLES.USER);

      expect(
        normalizeRole("user"),
      ).toBe(RBAC_ROLES.USER);
    });

    it("should normalize admin and owner roles to owner", () => {
      expect(
        normalizeRole("ADMIN"),
      ).toBe(RBAC_ROLES.OWNER);

      expect(
        normalizeRole("owner"),
      ).toBe(RBAC_ROLES.OWNER);
    });

    it("should return null for unknown roles", () => {
      expect(
        normalizeRole("unknown"),
      ).toBeNull();
    });
  });

  describe("hasRole", () => {
    it("should return true for matching role", () => {
      expect(
        hasRole(
          "user",
          [RBAC_ROLES.USER],
        ),
      ).toBe(true);
    });

    it("should return false for non-matching role", () => {
      expect(
        hasRole(
          "user",
          [RBAC_ROLES.OWNER],
        ),
      ).toBe(false);
    });
  });

  describe("hasPermission", () => {
    it("should allow owner permissions", () => {
      expect(
        hasPermission(
          "owner",
          RBAC_PERMISSIONS.ADMIN_ACCESS,
        ),
      ).toBe(true);
    });

    it("should deny user permissions", () => {
      expect(
        hasPermission(
          "user",
          RBAC_PERMISSIONS.ADMIN_ACCESS,
        ),
      ).toBe(false);
    });
  });

  describe("hasAnyPermission", () => {
    it("should return true when one permission is available", () => {
      expect(
        hasAnyPermission(
          "owner",
          [
            RBAC_PERMISSIONS.ADMIN_ACCESS,
            RBAC_PERMISSIONS.UAPPS_VIEW,
          ],
        ),
      ).toBe(true);
    });

    it("should return false when no permission is available", () => {
      expect(
        hasAnyPermission(
          "user",
          [
            RBAC_PERMISSIONS.ADMIN_ACCESS,
            RBAC_PERMISSIONS.UAPPS_VIEW,
          ],
        ),
      ).toBe(false);
    });
  });

  describe("hasAllPermissions", () => {
    it("should return true when all permissions are available", () => {
      expect(
        hasAllPermissions(
          "owner",
          [
            RBAC_PERMISSIONS.ADMIN_ACCESS,
            RBAC_PERMISSIONS.UAPPS_VIEW,
          ],
        ),
      ).toBe(true);
    });

    it("should return false when all permissions are not available", () => {
      expect(
        hasAllPermissions(
          "user",
          [
            RBAC_PERMISSIONS.ADMIN_ACCESS,
          ],
        ),
      ).toBe(false);
    });
  });
});