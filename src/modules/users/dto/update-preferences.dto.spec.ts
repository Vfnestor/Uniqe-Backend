import {
  validate,
} from "class-validator";

import {
  UpdatePreferencesDto,
} from "./update-preferences.dto";

describe("UpdatePreferencesDto", () => {
  it("should accept empty update", async () => {
    const dto =
      new UpdatePreferencesDto();

    const errors =
      await validate(dto);

    expect(
      errors,
    ).toHaveLength(0);
  });

  it("should accept valid preferences", async () => {
    const dto =
      new UpdatePreferencesDto();

    dto.theme =
      "DARK";

    dto.language =
      "fa";

    dto.notificationsEnabled =
      true;

    const errors =
      await validate(dto);

    expect(
      errors,
    ).toHaveLength(0);
  });

  it("should reject invalid theme", async () => {
    const dto =
      new UpdatePreferencesDto();

    dto.theme =
      "INVALID";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject short language", async () => {
    const dto =
      new UpdatePreferencesDto();

    dto.language =
      "a";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject non-boolean notifications", async () => {
    const dto =
      new UpdatePreferencesDto();

    dto.notificationsEnabled =
      "true" as any;

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });
});