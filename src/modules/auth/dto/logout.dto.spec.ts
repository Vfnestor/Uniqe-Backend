import {
  validate,
} from "class-validator";

import {
  LogoutDto,
} from "./logout.dto";

describe("LogoutDto", () => {
  it("should accept a valid refresh token", async () => {
    const dto =
      new LogoutDto();

    dto.refreshToken =
      "abcdefghijklmnopqrstuvwxyz";

    const errors =
      await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it("should reject a short refresh token", async () => {
    const dto =
      new LogoutDto();

    dto.refreshToken =
      "short";

    const errors =
      await validate(dto);

    expect(errors.length).toBeGreaterThan(
      0,
    );
  });
});