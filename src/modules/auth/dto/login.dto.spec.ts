import {
  validate,
} from "class-validator";

import {
  LoginDto,
} from "./login.dto";

describe("LoginDto", () => {
  it("should accept valid login data", async () => {
    const dto =
      new LoginDto();

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
      new LoginDto();

    dto.email =
      "invalid";

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
      new LoginDto();

    dto.email =
      "test@example.com";

    dto.password =
      "123";

    const errors =
      await validate(dto);

    expect(errors.length).toBeGreaterThan(
      0,
    );
  });
});