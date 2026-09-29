import {
  validate,
} from "class-validator";

import {
  RefreshTokenDto,
} from "./refresh-token.dto";

describe("RefreshTokenDto", () => {
  it("should accept a valid refresh token", async () => {
    const dto =
      new RefreshTokenDto();

    dto.refreshToken =
      "abcdefghijklmnopqrstuvwxyz";

    const errors =
      await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it("should reject a short refresh token", async () => {
    const dto =
      new RefreshTokenDto();

    dto.refreshToken =
      "short";

    const errors =
      await validate(dto);

    expect(errors.length).toBeGreaterThan(
      0,
    );
  });
});