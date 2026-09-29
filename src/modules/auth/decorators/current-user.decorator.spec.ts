import {
  CurrentUser,
} from "./current-user.decorator";

describe("CurrentUser Decorator", () => {
  it("should be defined", () => {
    expect(
      CurrentUser,
    ).toBeDefined();
  });

  it("should create a parameter decorator", () => {
    expect(
      typeof CurrentUser(),
    ).toBe("function");
  });
});