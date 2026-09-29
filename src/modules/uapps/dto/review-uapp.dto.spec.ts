import {
  validate,
} from "class-validator";

import {
  ReviewUAppDto,
} from "./review-uapp.dto";

describe(
  "ReviewUAppDto",
  () => {
    it(
      "should accept a valid rejection reason",
      async () => {
        const dto =
          new ReviewUAppDto();

        dto.reason =
          "Please provide a valid application description.";

        const errors =
          await validate(dto);

        expect(
          errors,
        ).toHaveLength(0);
      },
    );

    it(
      "should reject an empty reason",
      async () => {
        const dto =
          new ReviewUAppDto();

        dto.reason = "";

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );

    it(
      "should reject a very short reason",
      async () => {
        const dto =
          new ReviewUAppDto();

        dto.reason = "x";

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );
  },
);