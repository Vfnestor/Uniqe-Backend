import {
  validate,
} from "class-validator";

import {
  CreateUAppDto,
} from "./create-uapp.dto";

describe("CreateUAppDto", () => {
  function validDto() {
    const dto =
      new CreateUAppDto();

    dto.name =
      "Test App";

    dto.description =
      "A test application";

    dto.category =
      "Tools";

    dto.source =
      "uniqe";

    dto.sourceLabel =
      "Uniqe";

    dto.platform =
      "web";

    dto.platformLabel =
      "Web";

    dto.type =
      "web-app";

    dto.typeLabel =
      "Web App";

    dto.status =
      "available";

    dto.statusLabel =
      "Available";

    dto.icon =
      "test-icon";

    dto.accent =
      "blue";

    dto.href =
      "/uapps/test";

    return dto;
  }

  it("should accept valid data", async () => {
    const errors =
      await validate(
        validDto(),
      );

    expect(
      errors,
    ).toHaveLength(0);
  });

  it("should reject invalid source", async () => {
    const dto =
      validDto();

    dto.source =
      "invalid";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject invalid platform", async () => {
    const dto =
      validDto();

    dto.platform =
      "invalid";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject invalid type", async () => {
    const dto =
      validDto();

    dto.type =
      "invalid";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject invalid accent", async () => {
    const dto =
      validDto();

    dto.accent =
      "invalid";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });

  it("should reject too short name", async () => {
    const dto =
      validDto();

    dto.name =
      "A";

    const errors =
      await validate(dto);

    expect(
      errors.length,
    ).toBeGreaterThan(0);
  });
});