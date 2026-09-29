import {
  plainToInstance,
} from "class-transformer";

import {
  validate,
} from "class-validator";

import {
  ListUAppsQueryDto,
} from "./list-uapps-query.dto";

describe(
  "ListUAppsQueryDto",
  () => {
    it(
      "should transform pagination values",
      async () => {
        const dto =
          plainToInstance(
            ListUAppsQueryDto,
            {
              page: "2",
              limit: "10",
            },
          );

        const errors =
          await validate(dto);

        expect(
          errors,
        ).toHaveLength(0);

        expect(
          dto.page,
        ).toBe(2);

        expect(
          dto.limit,
        ).toBe(10);
      },
    );

    it(
      "should transform boolean filters",
      async () => {
        const dto =
          plainToInstance(
            ListUAppsQueryDto,
            {
              featured: "true",
              verified: "false",
              official: "true",
            },
          );

        const errors =
          await validate(dto);

        expect(
          errors,
        ).toHaveLength(0);

        expect(
          dto.featured,
        ).toBe(true);

        expect(
          dto.verified,
        ).toBe(false);

        expect(
          dto.official,
        ).toBe(true);
      },
    );

    it(
      "should accept valid filters",
      async () => {
        const dto =
          plainToInstance(
            ListUAppsQueryDto,
            {
              search: "gold",
              category: "finance",
              source: "uniqe",
              platform: "web",
              type: "web-app",
              status: "available",
              accent: "purple",
              reviewStatus:
                "approved",
            },
          );

        const errors =
          await validate(dto);

        expect(
          errors,
        ).toHaveLength(0);
      },
    );

    it(
      "should reject invalid enum filters",
      async () => {
        const dto =
          plainToInstance(
            ListUAppsQueryDto,
            {
              source: "unknown",
              platform: "unknown",
              type: "unknown",
              status: "unknown",
              accent: "unknown",
              reviewStatus:
                "unknown",
            },
          );

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );

    it(
      "should reject invalid pagination",
      async () => {
        const dto =
          plainToInstance(
            ListUAppsQueryDto,
            {
              page: "0",
              limit: "101",
            },
          );

        const errors =
          await validate(dto);

        expect(
          errors.length,
        ).toBeGreaterThan(0);
      },
    );
  },
);