import {
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";

import {
  UAppsService,
} from "./uapps.service";

describe(
  "UAppsService",
  () => {
    let service: UAppsService;

    const prisma: any = {
      uApp: {
        findMany:
          jest.fn(),

        count:
          jest.fn(),

        findUnique:
          jest.fn(),

        create:
          jest.fn(),

        update:
          jest.fn(),
      },
    };

    const app: any = {
      id: "app-1",
      name: "Test App",
      description: "Test",
      category: "Tools",
      source: "USER",
      sourceLabel: "User",
      platform: "WEB",
      platformLabel: "Web",
      type: "WEB_APP",
      typeLabel: "Web App",
      status: "AVAILABLE",
      statusLabel: "Available",
      icon: "icon",
      cover: null,
      accent: "BLUE",
      href: "/test",
      featured: false,
      verified: false,
      version: "1.0.0",
      official: false,
      releaseLabel: "Stable",
      productCode: null,
      releaseStatus: null,
      reviewStatus: "DRAFT",
      rejectionReason: null,
      metadata: null,
      creator: {
        id: "user-1",
        name: "Test User",
      },
      createdAt:
        new Date(
          "2026-01-01T00:00:00.000Z",
        ),
      updatedAt:
        new Date(
          "2026-01-02T00:00:00.000Z",
        ),
    };

    const approvedApp = {
      ...app,
      reviewStatus:
        "APPROVED",
    };

    const pendingApp = {
      ...app,
      reviewStatus:
        "PENDING_REVIEW",
    };

    const rejectedApp = {
      ...app,
      reviewStatus:
        "REJECTED",
      rejectionReason:
        "Needs improvement.",
    };

    const user: any = {
      sub: "user-1",
      role: "user",
    };

    const owner: any = {
      sub: "owner-1",
      role: "owner",
    };

    beforeEach(() => {
      jest.clearAllMocks();

      service =
        new UAppsService(
          prisma,
        );
    });

    it(
      "should list only approved UApps",
      async () => {
        prisma.uApp.findMany =
          jest
            .fn()
            .mockResolvedValue([
              approvedApp,
            ]);

        prisma.uApp.count =
          jest
            .fn()
            .mockResolvedValue(1);

        await service.list();

        expect(
          prisma.uApp.findMany,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            where:
              expect.objectContaining({
                reviewStatus:
                  "APPROVED",
              }),
          }),
        );
      },
    );

    it(
      "should allow creator to see own draft",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              app,
            );

        const result =
          await service.findById(
            "app-1",
            user,
          );

        expect(
          result.id,
        ).toBe("app-1");
      },
    );

    it(
      "should hide another user's draft",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue({
              ...app,
              creatorId:
                "another-user",
            });

        await expect(
          service.findById(
            "app-1",
            user,
          ),
        ).rejects.toThrow(
          NotFoundException,
        );
      },
    );

    it(
      "should allow owner to see any UApp",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              pendingApp,
            );

        const result =
          await service.findById(
            "app-1",
            owner,
          );

        expect(
          result.id,
        ).toBe("app-1");
      },
    );

    it(
      "should allow user to submit own UApp",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              rejectedApp,
            );

        prisma.uApp.update =
          jest
            .fn()
            .mockResolvedValue({
              ...rejectedApp,
              reviewStatus:
                "PENDING_REVIEW",
              rejectionReason:
                null,
            });

        const result =
          await service.submitForReview(
            "app-1",
            user,
          );

        expect(
          prisma.uApp.update,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data: {
              reviewStatus:
                "PENDING_REVIEW",
              rejectionReason:
                null,
            },
          }),
        );

        expect(
          result.reviewStatus,
        ).toBe(
          "pending-review",
        );
      },
    );

    it(
      "should reject submission from another user",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue({
              ...app,
              creatorId:
                "another-user",
            });

        await expect(
          service.submitForReview(
            "app-1",
            user,
          ),
        ).rejects.toThrow(
          ForbiddenException,
        );

        expect(
          prisma.uApp.update,
        ).not.toHaveBeenCalled();
      },
    );

    it(
      "should approve an existing UApp",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              pendingApp,
            );

        prisma.uApp.update =
          jest
            .fn()
            .mockResolvedValue(
              approvedApp,
            );

        const result =
          await service.approve(
            "app-1",
          );

        expect(
          prisma.uApp.update,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data: {
              reviewStatus:
                "APPROVED",
              rejectionReason:
                null,
            },
          }),
        );

        expect(
          result.reviewStatus,
        ).toBe(
          "approved",
        );
      },
    );

    it(
      "should reject an existing UApp",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              pendingApp,
            );

        prisma.uApp.update =
          jest
            .fn()
            .mockResolvedValue(
              rejectedApp,
            );

        const result =
          await service.reject(
            "app-1",
            {
              reason:
                "Needs improvement.",
            },
          );

        expect(
          prisma.uApp.update,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data: {
              reviewStatus:
                "REJECTED",
              rejectionReason:
                "Needs improvement.",
            },
          }),
        );

        expect(
          result.reviewStatus,
        ).toBe(
          "rejected",
        );
      },
    );

    it(
      "should reset user UApp to draft after editing",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              rejectedApp,
            );

        prisma.uApp.update =
          jest
            .fn()
            .mockResolvedValue({
              ...rejectedApp,
              name:
                "Updated App",
              reviewStatus:
                "DRAFT",
              rejectionReason:
                null,
            });

        await service.update(
          "app-1",
          {
            name:
              "Updated App",
          } as any,
          user,
        );

        expect(
          prisma.uApp.update,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data:
              expect.objectContaining({
                name:
                  "Updated App",
                reviewStatus:
                  "DRAFT",
                rejectionReason:
                  null,
              }),
          }),
        );
      },
    );

    it(
      "should throw when UApp does not exist",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              null,
            );

        await expect(
          service.approve(
            "missing",
          ),
        ).rejects.toThrow(
          NotFoundException,
        );
      },
    );
  },
);