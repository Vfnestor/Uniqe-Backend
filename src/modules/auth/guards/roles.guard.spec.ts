import {
  ExecutionContext,
} from "@nestjs/common";

import {
  Reflector,
} from "@nestjs/core";

import {
  RolesGuard,
} from "./roles.guard";

import {
  RBAC_ROLES,
} from "../rbac/rbac.constants";

describe("RolesGuard", () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector =
      new Reflector();

    guard =
      new RolesGuard(
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

  it("should allow access when no roles are required", () => {
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

  it("should allow matching role", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue([
        RBAC_ROLES.OWNER,
      ]);

    expect(
      guard.canActivate(
        createContext("owner"),
      ),
    ).toBe(true);
  });

  it("should deny non-matching role", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue([
        RBAC_ROLES.OWNER,
      ]);

    expect(() =>
      guard.canActivate(
        createContext("user"),
      ),
    ).toThrow(
      "You do not have permission to access this resource.",
    );
  });

  it("should deny when user is unavailable", () => {
    jest
      .spyOn(
        reflector,
        "getAllAndOverride",
      )
      .mockReturnValue([
        RBAC_ROLES.OWNER,
      ]);

    expect(() =>
      guard.canActivate(
        createContext(),
      ),
    ).toThrow(
      "User role is unavailable.",
    );
  });
});