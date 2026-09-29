import {
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
      source: "UNIQE",
      sourceLabel: "Uniqe",
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
      featured: true,
      verified: true,
      version: "1.0.0",
      official: true,
      releaseLabel: "Stable",
      productCode: null,
      releaseStatus: null,
      reviewStatus: "APPROVED",
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
          prisma.uApp.findMany,
        ).toHaveBeenCalledWith({
          where: {},
          skip: 0,
          take: 20,
          orderBy: [
            {
              featured:
                "desc",
            },
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
          prisma.uApp.count,
        ).toHaveBeenCalledWith({
          where: {},
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
      "should filter by search",
      async () => {
        prisma.uApp.findMany =
          jest
            .fn()
            .mockResolvedValue([]);

        prisma.uApp.count =
          jest
            .fn()
            .mockResolvedValue(0);

        await service.list({
          search: "gold",
        });

        expect(
          prisma.uApp.findMany,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            where: {
              OR: [
                {
                  name: {
                    contains: "gold",
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: "gold",
                    mode: "insensitive",
                  },
                },
                {
                  category: {
                    contains: "gold",
                    mode: "insensitive",
                  },
                },
              ],
            },
          }),
        );
      },
    );

    it(
      "should filter by multiple fields",
      async () => {
        prisma.uApp.findMany =
          jest
            .fn()
            .mockResolvedValue([]);

        prisma.uApp.count =
          jest
            .fn()
            .mockResolvedValue(0);

        await service.list({
          category: "finance",
          source: "uniqe",
          platform: "web",
          status: "available",
          featured: true,
          verified: true,
          official: true,
        });

        expect(
          prisma.uApp.findMany,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            where: {
              category: {
                equals: "finance",
                mode: "insensitive",
              },
              source: "UNIQE",
              platform: "WEB",
              status: "AVAILABLE",
              featured: true,
              verified: true,
              official: true,
            },
          }),
        );
      },
    );

    it(
      "should normalize invalid pagination values",
      async () => {
        prisma.uApp.findMany =
          jest
            .fn()
            .mockResolvedValue([]);

        prisma.uApp.count =
          jest
            .fn()
            .mockResolvedValue(0);

        const result =
          await service.list({
            page: -5,
            limit: 500,
          });

        expect(
          prisma.uApp.findMany,
        ).toHaveBeenCalledWith(
          expect.objectContaining({
            skip: 0,
            take: 100,
          }),
        );

        expect(
          result.meta.page,
        ).toBe(1);

        expect(
          result.meta.limit,
        ).toBe(100);
      },
    );

    it(
      "should find UApp by id",
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
          );

        expect(
          result.id,
        ).toBe("app-1");
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
          service.findById(
            "missing",
          ),
        ).rejects.toThrow(
          NotFoundException,
        );
      },
    );

    it(
      "should create a UApp",
      async () => {
        prisma.uApp.create =
          jest
            .fn()
            .mockResolvedValue(
              app,
            );

        const dto: any = {
          name: " Test App ",
          description:
            " Test description ",
          category: " Tools ",
          source: "uniqe",
          sourceLabel:
            " Uniqe ",
          platform: "web",
          platformLabel:
            " Web ",
          type: "web-app",
          typeLabel:
            " Web App ",
          status: "available",
          statusLabel:
            " Available ",
          icon: " icon ",
          accent: "blue",
          href: " /test ",
          featured: true,
          verified: true,
          official: true,
        };

        await service.create(
          dto,
          "user-1",
        );

        expect(
          prisma.uApp.create,
        ).toHaveBeenCalled();
      },
    );

    it(
      "should update a UApp",
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
                " Updated App ",
              featured: false,
            } as any,
          );

        expect(
          result.name,
        ).toBe(
          "Updated App",
        );
      },
    );
  },
);