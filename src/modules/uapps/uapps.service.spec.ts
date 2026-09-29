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
      "should list UApps",
      async () => {
        prisma.uApp.findMany =
          jest
            .fn()
            .mockResolvedValue([
              app,
            ]);

        prisma.uApp.count =
          jest
            .fn()
            .mockResolvedValue(1);

        const result =
          await service.list({
            page: 1,
            limit: 20,
          });

        expect(
          result.items,
        ).toHaveLength(1);

        expect(
          result.meta.total,
        ).toBe(1);
      },
    );

    it(
      "should list current user's UApps",
      async () => {
        prisma.uApp.findMany =
          jest
            .fn()
            .mockResolvedValue([
              app,
            ]);

        const result =
          await service.listMine(
            "user-1",
          );

        expect(
          prisma.uApp.findMany,
        ).toHaveBeenCalledWith({
          where: {
            creatorId:
              "user-1",
          },
          orderBy: [
            {
              createdAt:
                "desc",
            },
          ],
          include: {
            creator: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        expect(
          result.items[0].id,
        ).toBe("app-1");
      },
    );

    it(
      "should create a user UApp with protected ownership fields",
      async () => {
        prisma.uApp.create =
          jest
            .fn()
            .mockResolvedValue(
              app,
            );

        const dto: any = {
          name: "Test App",
          description:
            "Test description",
          category: "Tools",
          source: "uniqe",
          sourceLabel:
            "Uniqe",
          platform: "web",
          platformLabel:
            "Web",
          type: "web-app",
          typeLabel:
            "Web App",
          status: "available",
          statusLabel:
            "Available",
          icon: "icon",
          accent: "blue",
          href: "/test",
          featured: true,
          verified: true,
          official: true,
        };

        await service.create(
          dto,
          user,
        );

        expect(
          prisma.uApp.create,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data:
              expect.objectContaining({
                source: "USER",
                sourceLabel:
                  "User",
                featured: false,
                verified: false,
                official: false,
                reviewStatus:
                  "DRAFT",
                creator: {
                  connect: {
                    id: "user-1",
                  },
                },
              }),
          }),
        );
      },
    );

    it(
      "should allow owner to create an official UApp",
      async () => {
        prisma.uApp.create =
          jest
            .fn()
            .mockResolvedValue(
              app,
            );

        const dto: any = {
          name: "Official App",
          description:
            "Official application",
          category: "Tools",
          source: "uniqe",
          sourceLabel:
            "Uniqe",
          platform: "web",
          platformLabel:
            "Web",
          type: "web-app",
          typeLabel:
            "Web App",
          status: "available",
          statusLabel:
            "Available",
          icon: "icon",
          accent: "blue",
          href: "/official",
          featured: true,
          verified: true,
          official: true,
        };

        await service.create(
          dto,
          owner,
        );

        expect(
          prisma.uApp.create,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data:
              expect.objectContaining({
                source: "UNIQE",
                featured: true,
                verified: true,
                official: true,
                reviewStatus:
                  "APPROVED",
              }),
          }),
        );
      },
    );

    it(
      "should allow user to update own UApp",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              app,
            );

        prisma.uApp.update =
          jest
            .fn()
            .mockResolvedValue({
              ...app,
              name:
                "Updated App",
            });

        const result =
          await service.update(
            "app-1",
            {
              name:
                "Updated App",
              featured: true,
              verified: true,
              official: true,
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
              }),
          }),
        );

        expect(
          prisma.uApp.update
            .mock.calls[0][0]
            .data.featured,
        ).toBeUndefined();

        expect(
          result.name,
        ).toBe(
          "Updated App",
        );
      },
    );

    it(
      "should reject user from updating another user's UApp",
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
          service.update(
            "app-1",
            {
              name:
                "Hacked",
            } as any,
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
      "should allow owner to update any UApp",
      async () => {
        prisma.uApp.findUnique =
          jest
            .fn()
            .mockResolvedValue(
              app,
            );

        prisma.uApp.update =
          jest
            .fn()
            .mockResolvedValue({
              ...app,
              featured: true,
            });

        await service.update(
          "app-1",
          {
            featured: true,
            verified: true,
            official: true,
          } as any,
          owner,
        );

        expect(
          prisma.uApp.update,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            data:
              expect.objectContaining({
                featured: true,
                verified: true,
                official: true,
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
          service.update(
            "missing",
            {
              name:
                "Test",
            } as any,
            user,
          ),
        ).rejects.toThrow(
          NotFoundException,
        );
      },
    );
  },
);