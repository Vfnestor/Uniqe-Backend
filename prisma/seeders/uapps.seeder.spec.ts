import type { PrismaClient } from "@prisma/client";

import {
  seedUApps,
} from "./uapps.seeder";

describe("seedUApps", () => {
  function createPrismaMock() {
    return {
      uApp: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as PrismaClient;
  }

  it("creates a UApp when productCode does not exist", async () => {
    const prisma =
      createPrismaMock();

    const mock = prisma.uApp as {
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };

    mock.findFirst.mockResolvedValue(
      null,
    );

    mock.create.mockResolvedValue({
      id: "uapp-1",
    });

    await seedUApps(prisma, [
      {
        productCode:
          "TEST-APP",

        name: "Test App",
        description:
          "Test application",
        category: "Test",

        source: "UNIQE",
        sourceLabel: "Uniqe",

        platform: "WEB",
        platformLabel: "Web",

        type: "WEB_APP",
        typeLabel: "Web App",

        status: "AVAILABLE",
        statusLabel: "فعال",

        icon: "🧪",
        accent: "BLUE",

        href: "/uapps/test",

        reviewStatus:
          "APPROVED",
      },
    ]);

    expect(
      mock.findFirst,
    ).toHaveBeenCalledWith({
      where: {
        productCode:
          "TEST-APP",
      },
    });

    expect(
      mock.create,
    ).toHaveBeenCalledTimes(1);

    expect(
      mock.update,
    ).not.toHaveBeenCalled();
  });

  it("updates an existing UApp by productCode", async () => {
    const prisma =
      createPrismaMock();

    const mock = prisma.uApp as {
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };

    mock.findFirst.mockResolvedValue({
      id: "existing-id",
    });

    mock.update.mockResolvedValue({
      id: "existing-id",
    });

    await seedUApps(prisma, [
      {
        productCode:
          "TEST-APP",

        name: "Updated App",
        description:
          "Updated application",
        category: "Test",

        source: "UNIQE",
        sourceLabel: "Uniqe",

        platform: "WEB",
        platformLabel: "Web",

        type: "WEB_APP",
        typeLabel: "Web App",

        status: "AVAILABLE",
        statusLabel: "فعال",

        icon: "🧪",
        accent: "PURPLE",

        href: "/uapps/test",

        reviewStatus:
          "APPROVED",
      },
    ]);

    expect(
      mock.update,
    ).toHaveBeenCalledTimes(1);

    expect(
      mock.create,
    ).not.toHaveBeenCalled();
  });
});