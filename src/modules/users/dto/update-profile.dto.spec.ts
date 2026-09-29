import {
  validate,
} from "class-validator";

import {
  UpdateProfileDto,
} from "./update-profile.dto";

describe("UpdateProfileDto", () => {
  it("should accept empty update", async () => {
    const dto =
      new UpdateProfileDto();

    const errors =
      await validate(dto);

    expect(
      errors,
    ).toHaveLength(0);
  });

  it("should accept valid profile data", async () => {
    const dto =
      new UpdateProfileDto();

    dto.displayName =
      "Test User";

    dto.bio =
      "Test bio";

    dto.avatarUrl =
      "https://example.com/avatar.png";

    dto.language =
      "fa";

    dto.theme =
      "dark";

    const errors =
      await validate(dto);

    expect(
      errors,
    ).toHaveLength(0);
  });

  it("should reject short display name", async () => {
    const dto =
      new UpdateProfileDto();

    dto.displayName =
      "A";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject short language", async () => {
    const dto =
      new UpdateProfileDto();

    dto.language =
      "a";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject overly long theme", async () => {
    const dto =
      new UpdateProfileDto();

    dto.theme =
      "a".repeat(21);

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });
});