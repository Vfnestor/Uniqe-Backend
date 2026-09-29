import {
  UpdatePreferencesDto,
  UpdateProfileDto,
} from "./index";

describe("Users DTO Barrel", () => {
  it("should export UpdateProfileDto", () => {
    expect(
      UpdateProfileDto,
    ).toBeDefined();
  });

  it("should export UpdatePreferencesDto", () => {
    expect(
      UpdatePreferencesDto,
    ).toBeDefined();
  });
});