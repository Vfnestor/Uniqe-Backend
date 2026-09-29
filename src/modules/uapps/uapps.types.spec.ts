import type {
  UAppListQuery,
  UAppListResponse,
  UAppResponse,
} from "./uapps.types";

describe(
  "UApps Types",
  () => {
    it(
      "should support UApp list query structure",
      () => {
        const query: UAppListQuery =
          {
            page: 1,
            limit: 20,
            search: "gold",
            category:
              "finance",
            source: "uniqe",
            platform: "web",
            type: "web-app",
            status:
              "available",
            accent:
              "purple",
            reviewStatus:
              "approved",
            featured: true,
            verified: true,
            official: true,
          };

        expect(
          query.page,
        ).toBe(1);

        expect(
          query.search,
        ).toBe("gold");

        expect(
          query.platform,
        ).toBe("web");
      },
    );

    it(
      "should support UApp response structure",
      () => {
        const app: UAppResponse =
          {
            id: "app-1",
            name: "Test App",
            description:
              "Test description",
            category:
              "Tools",
            source:
              "uniqe",
            sourceLabel:
              "Uniqe",
            platform:
              "web",
            platformLabel:
              "Web",
            type:
              "web-app",
            typeLabel:
              "Web App",
            status:
              "available",
            statusLabel:
              "Available",
            icon: "icon",
            cover: null,
            accent:
              "purple",
            href: "/test",
            featured: true,
            verified: true,
            version:
              "1.0.0",
            official: true,
            releaseLabel:
              "Stable",
            productCode:
              null,
            releaseStatus:
              "stable",
            reviewStatus:
              "approved",
            rejectionReason:
              null,
            creator: {
              id: "user-1",
              name:
                "Test User",
            },
            metadata: null,
            createdAt:
              "2026-01-01T00:00:00.000Z",
            updatedAt:
              "2026-01-02T00:00:00.000Z",
          };

        expect(
          app.id,
        ).toBe("app-1");

        expect(
          app.reviewStatus,
        ).toBe("approved");
      },
    );

    it(
      "should support paginated list response",
      () => {
        const response:
          UAppListResponse =
          {
            items: [],
            meta: {
              page: 1,
              limit: 20,
              total: 0,
              totalPages: 0,
            },
          };

        expect(
          response.items,
        ).toEqual([]);

        expect(
          response.meta.total,
        ).toBe(0);
      },
    );
  },
);