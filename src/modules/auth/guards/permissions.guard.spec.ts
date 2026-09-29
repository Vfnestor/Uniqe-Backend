import {
  ExecutionContext,
} from "@nestjs/common";

import {
  Reflector,
} from "@nestjs/core";

import {
  PermissionsGuard,
} from "./permissions.guard";

import {
  RBAC_PERMISSIONS,
} from "../rbac/rbac.constants";

describe("PermissionsGuard", () => {
  let guard: PermissionsGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector =
      new Reflector();

    guard =
      new PermissionsGuard(
        reflector,
      );
  });

  function createContext(
    role?: string,
  ): ExecutionContext {
    return {
      getHandler: () => jest.fn(),
      getClass: () => jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: role
            ? {
                sub: "user-1",
                email:
                  "test@example.com",
                role,
                type: "access",
              }
            : undefined,
        }),
      }),
    } as unknown as ExecutionContext;
  }

  it("should allow access when no permissions are required", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue(undefined);

    expect(
      guard.canActivate(
        createContext("user"),
      ),
    ).toBe(true);
  });

  it("should allow owner with required permission", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue([
        RBAC_PERMISSIONS.ADMIN_ACCESS,
      ]);

    expect(
      guard.canActivate(
        createContext("owner"),
      ),
    ).toBe(true);
  });

  it("should deny user without permission", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue([
        RBAC_PERMISSIONS.ADMIN_ACCESS,
      ]);

    expect(() =>
      guard.canActivate(
        createContext("user"),
      ),
    ).toThrow(
      "You do not have the required permissions.",
    );
  });

  it("should deny when authenticated user is unavailable", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue([
        RBAC_PERMISSIONS.ADMIN_ACCESS,
      ]);

    expect(() =>
      guard.canActivate(
        createContext(),
      ),
    ).toThrow(
      "Authenticated user is required.",
    );
  });
});