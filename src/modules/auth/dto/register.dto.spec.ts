import {
  validate,
} from "class-validator";

import {
  RegisterDto,
} from "./register.dto";

describe("RegisterDto", () => {
  it("should accept valid data", async () => {
    const dto =
      new RegisterDto();

    dto.name =
      "Test User";

    dto.email =
      "test@example.com";

    dto.password =
      "password123";

    const errors =
      await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it("should reject invalid email", async () => {
    const dto =
      new RegisterDto();

    dto.name =
      "Test User";

    dto.email =
      "invalid-email";

    dto.password =
      "password123";

    const errors =
      await validate(dto);

    expect(errors.length).toBeGreaterThan(
      0,
    );
  });

  it("should reject short password", async () => {
    const dto =
      new RegisterDto();

    dto.name =
      "Test User";

    dto.email =
      "test@example.com";

    dto.password =
      "1234567";

    const errors =
      await validate(dto);

    expect(errors.length).toBeGreaterThan(
      0,
    );
  });

  it("should reject short name", async () => {
    const dto =
      new RegisterDto();

    dto.name = "A";

    dto.email =
      "test@example.com";

    dto.password =
      "password123";

    const errors =
      await validate(dto);

    expect(errors.length).toBeGreaterThan(
      0,
    );
  });
});