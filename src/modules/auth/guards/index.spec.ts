import {
  JwtAuthGuard,
} from "./index";

import {
  RolesGuard,
} from "./index";

import {
  PermissionsGuard,
} from "./index";

describe("Auth Guards Barrel", () => {
  it("should export JwtAuthGuard", () => {
    expect(
      JwtAuthGuard,
    ).toBeDefined();
  });

  it("should export RolesGuard", () => {
    expect(
      RolesGuard,
    ).toBeDefined();
  });

  it("should export PermissionsGuard", () => {
    expect(
      PermissionsGuard,
    ).toBeDefined();
  });
});