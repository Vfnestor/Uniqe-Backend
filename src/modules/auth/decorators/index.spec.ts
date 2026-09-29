import {
  CurrentUser,
  Roles,
  Permissions,
  Authorize,
} from "./index";

describe("Auth Decorators Barrel", () => {
  it("should export CurrentUser", () => {
    expect(
      CurrentUser,
    ).toBeDefined();
  });

  it("should export Roles", () => {
    expect(
      Roles,
    ).toBeDefined();
  });

  it("should export Permissions", () => {
    expect(
      Permissions,
    ).toBeDefined();
  });

  it("should export Authorize", () => {
    expect(
      Authorize,
    ).toBeDefined();
  });
});