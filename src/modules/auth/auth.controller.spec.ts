import {
  AuthController,
} from "./auth.controller";

describe("AuthController", () => {
  it("should define the authentication controller", () => {
    expect(
      AuthController,
    ).toBeDefined();
  });

  it("should expose authentication handlers", () => {
    const prototype =
      AuthController.prototype;

    expect(
      typeof prototype.register,
    ).toBe("function");

    expect(
      typeof prototype.login,
    ).toBe("function");

    expect(
      typeof prototype.loginAdmin,
    ).toBe("function");

    expect(
      typeof prototype.refresh,
    ).toBe("function");

    expect(
      typeof prototype.session,
    ).toBe("function");

    expect(
      typeof prototype.logout,
    ).toBe("function");
  });
});