import {
  RbacController,
} from "./rbac.controller";

import {
  RbacService,
} from "./rbac.service";

import {
  RBAC_PERMISSIONS,
} from "./rbac.constants";

describe("RbacController", () => {
  let controller: RbacController;

  const rbacService = {
    getPermissionsForRole:
      jest.fn(),
  } as unknown as RbacService;

  beforeEach(() => {
    jest.clearAllMocks();

    controller =
      new RbacController(
        rbacService,
      );
  });

  it("should return authenticated user information", () => {
    const result =
      controller.authenticated({
        sub: "user-1",
        email:
          "test@example.com",
        role: "user",
        type: "access",
      });

    expect(result).toEqual({
      message:
        "Authenticated RBAC endpoint.",
      userId: "user-1",
      role: "user",
    });
  });

  it("should return owner access information", () => {
    const result =
      controller.ownerOnly({
        sub: "owner-1",
        email:
          "owner@example.com",
        role: "owner",
        type: "access",
      });

    expect(result).toEqual({
      message:
        "Owner RBAC access granted.",
      userId: "owner-1",
      role: "owner",
    });
  });

  it("should return admin permission information", () => {
    const result =
      controller.adminAccess({
        sub: "owner-1",
        email:
          "owner@example.com",
        role: "owner",
        type: "access",
      });

    expect(result).toEqual({
      message:
        "Admin permission granted.",
      userId: "owner-1",
      role: "owner",
      permission:
        RBAC_PERMISSIONS.ADMIN_ACCESS,
    });
  });

  it("should return permissions for current role", () => {
    rbacService.getPermissionsForRole =
      jest
        .fn()
        .mockReturnValue([
          RBAC_PERMISSIONS.ADMIN_ACCESS,
        ]);

    const result =
      controller.permissions({
        sub: "owner-1",
        email:
          "owner@example.com",
        role: "owner",
        type: "access",
      });

    expect(
      rbacService.getPermissionsForRole,
    ).toHaveBeenCalledWith(
      "owner",
    );

    expect(result).toEqual({
      role: "owner",
      permissions: [
        RBAC_PERMISSIONS.ADMIN_ACCESS,
      ],
    });
  });
});