import {
  UsersModule,
  UsersService,
  UserAccountResponse,
} from "./index";

describe("Users Barrel", () => {
  it("should export UsersModule", () => {
    expect(
      UsersModule,
    ).toBeDefined();
  });

  it("should export UsersService", () => {
    expect(
      UsersService,
    ).toBeDefined();
  });

  it("should expose user types at compile time", () => {
    const account =
      null as unknown as UserAccountResponse;

    expect(
      account,
    ).toBeNull();
  });
});