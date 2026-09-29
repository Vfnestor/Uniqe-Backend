import {
  validate,
} from "class-validator";

import {
  UpdateUAppDto,
} from "./update-uapp.dto";

describe(
  "UpdateUAppDto",
  () => {
    it(
      "should accept empty update",
      async () => {
        const dto =
          new UpdateUAppDto();

        const errors =
          await validate(dto);

        expect(
          errors,
        ).toHaveLength(0);
      },
    );

    it(
      "should accept valid update",
      async () => {
        const dto =
          new UpdateUAppDto();

        dto.name =
          "Updated App";

        dto.description =
          "Updated description";

        dto.category =
          "Tools";

        dto.accent =
          "purple";

        dto.featured =
          true;

        dto.verified =
          true;

        const errors =
          await validate(dto);

        expect(
          errors,
        ).toHaveLength(0);
      },
    );

    it(
      "should reject invalid accent",
      async () => {
        const dto =
          new UpdateUAppDto();

        dto.accent =
          "invalid";

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );

    it(
      "should reject invalid release status",
      async () => {
        const dto =
          new UpdateUAppDto();

        dto.releaseStatus =
          "invalid";

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );

    it(
      "should reject short name",
      async () => {
        const dto =
          new UpdateUAppDto();

        dto.name =
          "A";

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );
  },
);